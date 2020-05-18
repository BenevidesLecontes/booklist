import { graphqlClient } from "util/graphql";

import GetTags from "graphQL/tags/getTags.graphql";
import { useContext, useMemo } from "react";
import { buildQuery, useSuspenseQuery } from "micro-graphql-react";
import { AppContext } from "../renderUI";

import { syncUpdates, syncDeletes } from "../../util/graphqlHelpers";
import { QueryOf, Queries } from "graphql-typings";

interface ITag {
  _id: string;
  name: string;
}

export interface TagsState {
  tagsLoaded: boolean;
  tags: ITag[];
  tagHash: any;
}

graphqlClient.subscribeMutation([
  {
    when: /(update|create)Tag/,
    run: ({ refreshActiveQueries }, res) => {
      syncUpdates(GetTags, [(res.updateTag || res.createTag).Tag], "allTags", "Tags", { sort: tagsSort });
      debugger;
      refreshActiveQueries();
    }
  },
  {
    when: /deleteTag/,
    run: ({ refreshActiveQueries }, res, req) => {
      syncDeletes(GetTags, [req._id], "allTags", "Tags", { sort: tagsSort });
      refreshActiveQueries();
    }
  }
]);

export function useTagsState(): TagsState {
  const [{ publicUserId }] = useContext(AppContext);
  const req = { publicUserId };
  const { loaded, data } = useSuspenseQuery<QueryOf<Queries["allTags"]>>(buildQuery(GetTags, req));
  debugger;

  const tags = data ? data.allTags.Tags : [];
  return useMemo(() => {
    return {
      tags,
      tagHash: tags && tags.length ? tags.reduce((hash, t) => ((hash[t._id] = t), hash), {}) : {},
      tagsLoaded : loaded
    };
    //return tags && tags.length ? tags.reduce((hash, t) => ((hash[t._id] = t), hash), {}) : {};
  }, [tags]);

  //return { tagsLoaded: loaded, tags, tagHash };
}

const tagsSort = ({ name: name1 }, { name: name2 }) => {
  let name1After = name1.toLowerCase() > name2.toLowerCase();
  let bothEqual = name1.toLowerCase() === name2.toLowerCase();
  return bothEqual ? 0 : name1After ? 1 : -1;
};

export const filterTags = (tags, search) => {
  if (!search) {
    search = () => true;
  } else {
    let regex = new RegExp(search, "i");
    search = txt => regex.test(txt);
  }
  return tags.filter(s => search(s.name));
};

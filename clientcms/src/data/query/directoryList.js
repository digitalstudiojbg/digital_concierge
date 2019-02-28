import gql from "graphql-tag";
import { directoryListFragment } from "../fragment";

export const getDirectoryListBySystem = _systemId => {
    return gql`
        query directoryLists_by_system($id: ID!) {
            directoryLists_by_system(id: $id) {
                ...directoryListDetail
                child_directory_lists {
                    ...directoryListDetail
                    child_directory_lists {
                        ...directoryListDetail
                        child_directory_lists {
                            ...directoryListDetail
                            child_directory_lists {
                                ...directoryListDetail
                            }
                        }
                    }
                }
            }
        }
        ${directoryListFragment}
    `;
};

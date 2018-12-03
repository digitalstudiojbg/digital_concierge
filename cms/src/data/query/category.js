import gql from "graphql-tag";

export const getTabletCategoryByVenue = venueId => {
    return gql`
        query get_tb_category_by_venue {
            tb_categories_by_venue(id: ${venueId}) {
                id
                name
                has_directory
                active
                image
                tb_directory_type {
                    name
                }
                venues {
                    name
                }
                tb_directories {
                    name
                }
                child_category {
                    id
                    name
                    has_directory
                    active
                    image
                    tb_directory_type {
                        name
                    }
                    venues {
                        name
                    }
                    tb_directories {
                        name
                    }
                    child_category {
                        id
                        name
                        has_directory
                        active
                        image
                        tb_directory_type {
                            name
                        }
                        venues {
                            name
                        }
                        tb_directories {
                            name
                        }
                        child_category {
                            id
                            name
                            has_directory
                            active
                            image
                            tb_directory_type {
                                name
                            }
                            venues {
                                name
                            }
                            tb_directories {
                                name
                            }
                            child_category {
                                id
                                name
                                has_directory
                                active
                                image
                                tb_directory_type {
                                    name
                                }
                                venues {
                                    name
                                }
                                tb_directories {
                                    name
                                }
                                child_category {
                                    id
                                    name
                                    has_directory
                                    active
                                    image
                                    tb_directory_type {
                                        name
                                    }
                                    venues {
                                        name
                                    }
                                    tb_directories {
                                        name
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    `;
};

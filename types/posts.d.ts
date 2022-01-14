export interface IPosts {
    cursor?: string;
    node: INode;
}

export interface INode {
    author:        IAuthor;
    createdAt:     Date;
    slug:          string;
    title:         string;
    excerpt:       string;
    featuredImage: IFeaturedImage;
    categories:    ICategory[];
}

export interface IAuthor {
    bio:   string;
    name:  string;
    id:    string;
    photo: IFeaturedImage;
}

export interface IFeaturedImage {
    url: string;
}

export interface ICategory {
    name: string;
    slug: string;
}

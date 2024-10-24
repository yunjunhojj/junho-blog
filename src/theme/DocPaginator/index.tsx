import React from "react";
import DocPaginator from "@theme-original/DocPaginator";
import type DocPaginatorType from "@theme/DocPaginator";
import type { WrapperProps } from "@docusaurus/types";
import { CommentSection } from "@site/src/components/Comment/CommentSection";

type Props = WrapperProps<typeof DocPaginatorType>;

export default function DocPaginatorWrapper(props: Props): JSX.Element {
  return (
    <>
      <DocPaginator {...props} />
      <CommentSection />
    </>
  );
}

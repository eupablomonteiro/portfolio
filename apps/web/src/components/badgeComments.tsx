import React from "react";

interface BagdeCommentProps {
  comment: string;
}

export const BadgeComments = ({ comment }: BagdeCommentProps) => {
  return (
    <p className="font-mono text-sm font-medium text-portfolio-primary">
      {"// "} {comment}
    </p>
  );
};


import { RecipeTree } from "@/lib/models";
import { RecipesSelector } from "./RecipesSelector";
import React from "react";

interface SelectorTreeProps {
  rowId: string;
  recipesTree: RecipeTree;
  treePath: string[];
  isLast?: boolean;
}

export function SelectorTree({
  rowId,
  recipesTree,
  treePath,
  isLast = false,
}: SelectorTreeProps) {
  const depth = treePath.length - 1;
  const isRoot = depth === 0;
  const hasChildren = recipesTree.required.length > 0;
  const wrapperClassNames = [
    "tree-node",
    isRoot ? "tree-node--root" : "",
    isLast ? "tree-node--last" : "",
    hasChildren ? "tree-node--branch" : "tree-node--leaf",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={wrapperClassNames}
      style={{ "--tree-depth": depth } as React.CSSProperties}
    >
      <div className="tree-node__content">
        <RecipesSelector
          rowId={rowId}
          stuff={recipesTree.stuff}
          recipes={recipesTree.recipes}
          treePath={treePath}
        />
      </div>
      {hasChildren && (
        <div className="tree-node__children">
          {recipesTree.required.map((e, index) => (
            <SelectorTree
              key={e.stuff}
              rowId={rowId}
              recipesTree={e}
              treePath={[...treePath, e.stuff]}
              isLast={index === recipesTree.required.length - 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}

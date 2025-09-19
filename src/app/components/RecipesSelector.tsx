import { selectTreeRecipe } from "@/lib/features/desiredSlice";
import { useAppDispatch } from "@/lib/hooks";
import { IRecipe } from "@/lib/models";
import { useTreeSelectedRecipe } from "@/lib/selectors";
import { RadioGroup, Field, Radio, Label } from "@headlessui/react";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import type { CSSProperties } from "react";
import { StuffIcon } from "./StuffIcon";

interface RecipesSelectorProps {
  rowId: string;
  stuff: string;
  recipes: IRecipe[];
  treePath: string[];
  isLast?: boolean;
}

const TREE_SPACING = "1.5rem";
const TREE_PANEL_INSET = "0.5rem";
const TREE_LINE_THICKNESS = "0.125rem";

export function RecipesSelector({
  rowId,
  stuff,
  recipes,
  treePath,
  isLast = false,
}: RecipesSelectorProps) {
  const selectedRecipe = useTreeSelectedRecipe(rowId, treePath);
  const dispatch = useAppDispatch();

  const selectRecipe = (recipe: IRecipe) => {
    dispatch(selectTreeRecipe({ rowId, recipe, treePath }));
  };

  const treeDepth = Math.max(treePath.length - 1, 0);
  const isNested = treeDepth > 0;

  const depthStyles = {
    "--tree-depth": `${treeDepth}`,
    "--tree-spacing": TREE_SPACING,
    "--tree-panel-inset": TREE_PANEL_INSET,
    "--tree-line-thickness": TREE_LINE_THICKNESS,
  } as CSSProperties;

  const connectorLeft =
    "calc(var(--tree-panel-inset) + (var(--tree-depth) - 1) * var(--tree-spacing))";
  const connectorHeight = isNested
    ? isLast
      ? "calc(50% - var(--tree-line-thickness) / 2)"
      : "100%"
    : undefined;
  const horizontalTop =
    "calc(50% - var(--tree-line-thickness) / 2)";

  const contentPadding =
    "calc(var(--tree-depth) * var(--tree-spacing))";

  return (
    <div className="relative panel-compact mb-1" style={depthStyles}>
      {/* Tree connector lines */}
      {isNested && (
        <>
          {/* Vertical line for this level */}
          <div
            className="absolute tree-line"
            style={{
              left: connectorLeft,
              top: "0",
              width: "var(--tree-line-thickness)",
              height: connectorHeight,
              backgroundColor: "var(--border-600)",
              opacity: "0.6",
            }}
          ></div>
          {/* Horizontal connector from parent to current item */}
          <div
            className="absolute tree-line"
            style={{
              left: connectorLeft,
              top: horizontalTop,
              width: "var(--tree-spacing)",
              height: "var(--tree-line-thickness)",
              backgroundColor: "var(--border-600)",
              opacity: "0.8",
            }}
          ></div>
        </>
      )}
      <div
        className="relative z-10"
        style={{
          paddingLeft: contentPadding,
        }}
      >
        <span className="font-medium text-sm tracking-wide text-muted-300">
          {stuff}
        </span>
        <RadioGroup
          value={selectedRecipe}
          onChange={(e) => selectRecipe(e)}
          aria-label={`Recipe for ${stuff}`}
          className="mt-1"
        >
          {recipes.map((recipe) => (
            <Field key={recipe.id} className="flex items-center gap-2 mb-0.5">
              <Radio
                value={recipe}
                className="group flex size-5 items-center justify-center rounded-full border border-border-600 bg-panel-300 data-[checked]:bg-accent-500 data-[disabled]:bg-gray-800"
              >
                <span className="invisible size-2 rounded-full bg-white group-data-[checked]:visible" />
              </Radio>
              <Label className="data-[disabled]:opacity-50 flex flex-row space-x-1 items-center">
                <div className="flex flex-row space-x-1">
                  {recipe.required.map((e) => (
                    <StuffIcon
                      key={e.stuff}
                      stuffName={e.stuff}
                      count={e.count}
                    />
                  ))}
                </div>
                <ArrowRightIcon className="size-6 mx-1 text-muted-400" />
                <div className="flex flex-row space-x-1">
                  {recipe.produced.map((e) => (
                    <StuffIcon
                      key={e.stuff}
                      stuffName={e.stuff}
                      count={e.count}
                    />
                  ))}
                </div>
              </Label>
            </Field>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
}

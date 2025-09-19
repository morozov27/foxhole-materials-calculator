import { selectTreeRecipe } from "@/lib/features/desiredSlice";
import { useAppDispatch } from "@/lib/hooks";
import { IRecipe } from "@/lib/models";
import { useTreeSelectedRecipe } from "@/lib/selectors";
import { RadioGroup, Field, Radio, Label } from "@headlessui/react";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { StuffIcon } from "./StuffIcon";

interface RecipesSelectorProps {
  rowId: string;
  stuff: string;
  recipes: IRecipe[];
  treePath: string[];
}

export function RecipesSelector({
  rowId,
  stuff,
  recipes,
  treePath,
}: RecipesSelectorProps) {
  const selectedRecipe = useTreeSelectedRecipe(rowId, treePath);
  const dispatch = useAppDispatch();

  const selectRecipe = (recipe: IRecipe) => {
    dispatch(selectTreeRecipe({ rowId, recipe, treePath }));
  };

  return (
    <div className="relative z-10 panel-compact mb-1">
      <div className="relative z-10">
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

import {
  Flour as FlourModel,
  Selection as SelectionModel,
  Selections as SelectionsModel,
} from "../../models/flour";
import { Update } from "../../models/update";
import { NewSelection } from "./NewSelection";
import { Selection } from "./Selection";

interface Props {
  flours: FlourModel[];
  selections: SelectionsModel;
  addNewSelection: (selection: SelectionModel) => void;
  deleteSelection: (id: number) => void;
  updateSelection: (update: Update) => void;
}

export function Selections({
  flours,
  selections,
  addNewSelection,
  deleteSelection,
  updateSelection,
}: Props) {
  const orderSelectionsByAmount = () => {
    // todo - probably handle in App state?
  };

  return (
    <>
      <details open={true}>
        <summary>
          <h2>My Selections</h2>
        </summary>

        <table>
          <tbody>
            <tr className="table-headings">
              <td>Flour</td>
              <td onClick={orderSelectionsByAmount}>Amount</td>
              <td>Hydration</td>
              <td></td>
            </tr>

            {Object.values(selections)
              .sort((a, b) => (a.position > b.position ? 1 : -1))
              .map((selection) => {
                return (
                  <Selection
                    selection={selection}
                    deleteSelection={deleteSelection}
                    updateSelection={updateSelection}
                    key={Math.random()}
                  />
                );
              })}

            <NewSelection
              flours={flours}
              selections={selections}
              addNewSelection={addNewSelection}
            />
          </tbody>
        </table>
      </details>
      <hr />
    </>
  );
}

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth0 } from "@auth0/auth0-react";

import { getFlours } from "./api/flours";

import { Selection, Selections as SelectionsModel } from "../models/flour";
import { StarterData } from "../models/starter";
import { Update } from "../models/update";

import { Selections } from "./components/Selections";
import { Starter } from "./components/Starter";
import { Totals } from "./components/Totals";
import { Nav } from "./components/Nav";

export default function App() {
  const { user, isLoading: authIsLoading, isAuthenticated } = useAuth0();

  const {
    data: flourDb,
    isError,
    isLoading: queryIsLoading,
  } = useQuery(["flours"], getFlours);

  const locallyStoredSelections = localStorage.getItem("selections");
  const locallyStoredStarter = localStorage.getItem("starter");
  // console.log(locallyStoredSelections, locallyStoredStarter)

  const [selections, setSelections] = useState<SelectionsModel>(
    locallyStoredSelections && user
      ? JSON.parse(locallyStoredSelections)
      : defaultSelectionsData,
  );

  const [starter, setStarter] = useState<StarterData>(
    locallyStoredStarter && user
      ? JSON.parse(locallyStoredStarter)
      : defaultStarterData,
  );

  useEffect(() => {
    if (user) {
      localStorage.setItem("selections", JSON.stringify(selections));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selections]);

  useEffect(() => {
    if (user) {
      localStorage.setItem("starter", JSON.stringify(starter));
      console.log(starter);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [starter]);

  useEffect(() => {
    if (user && locallyStoredSelections != null) {
      setSelections(JSON.parse(locallyStoredSelections));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, isAuthenticated]);

  useEffect(() => {
    if (user && locallyStoredStarter != null) {
      setStarter(JSON.parse(locallyStoredStarter));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, isAuthenticated]);

  const addNewSelection = (selection: Selection) => {
    setSelections({ ...selections, [selection.id]: selection });
  };

  const deleteSelection = (id: number) => {
    const updated = { ...selections };
    delete updated[id];
    setSelections(updated);
  };

  const updateSelection = (update: Update) => {
    const updated = { ...selections };

    switch (update.key) {
      case "defaultHydration":
        delete updated[update.id].alteredHydration;
        break;

      case "alteredHydration":
        updated[update.id].alteredHydration = update.value;
        break;

      case "amount":
        updated[update.id].amount = update.value;
        break;
    }

    setSelections(updated);
  };

  if (isError || queryIsLoading || authIsLoading)
    return <p>... please wait ...</p>;

  return (
    <>
      <Nav />
      {/* <Title /> */}
      <Selections
        flours={flourDb}
        selections={selections}
        addNewSelection={addNewSelection}
        deleteSelection={deleteSelection}
        updateSelection={updateSelection}
      />
      <Starter starter={starter} setStarter={setStarter} flours={flourDb} />
      <Totals selections={selections} starter={starter} />
    </>
  );
}

const defaultSelectionsData: SelectionsModel = {
  1000: {
    id: 1000,
    flourId: 101,
    name: "Wheat",
    defaultHydration: 75,
    isGlutenFree: false,
    amount: 300,
    position: 1,
  },
  // 1001: {
  //   id: 1001,
  //   flourId: 103,
  //   name: 'Rye',
  //   defaultHydration: 65,
  //   alteredHydration: 72,
  //   isGlutenFree: false,
  //   amount: 150,
  //   position: 2,
  // },
  // 1002: {
  //   id: 1002,
  //   flourId: 106,
  //   name: 'Spelt',
  //   defaultHydration: 63,
  //   isGlutenFree: false,
  //   amount: 50,
  //   position: 3,
  // },
};

const defaultStarterData: StarterData = {
  flourId: 103,
  wet: 100,
  dry: 100,
};

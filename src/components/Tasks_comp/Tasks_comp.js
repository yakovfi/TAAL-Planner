import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import DragnDrop from "../DragnDrop/DragnDrop";

const Tasks_comp = (props) => {
    // console.log("Task AllStation in:", props.allStations)
    // console.log("mySite TaskComp:", props.mySite)

    console.log("Task AllStation in:", props.allStations)
    // console.log("flot task comp:", props.language)

    return (
        <>
            <DndProvider backend={HTML5Backend}>
                <DragnDrop propDataTask={props.propsDataTask} allStations={props.allStations}
                    language={props.language} myTasks={props.myTasks} drag={props.drag}
                    addMyTask={props.addMyTask} titleTaskCss={props.titleTaskCss} mySite={props.mySite}
                    flagHebrew={props.flagHebrew} tasksOfRoutes={props.tasksOfRoutes} myStation={props.myStation}
                    myStations={props.myStations} />
            </DndProvider >
        </>
    );
}
export default Tasks_comp;
//----------------------------------------

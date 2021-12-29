import '../css/Scene.css'
import Car from "./Car"



export default function Scene(){


    return(
        <div className="scene-container flex-container">
            <div className="scene">
                <Car />
            </div>
        </div>
    )
}
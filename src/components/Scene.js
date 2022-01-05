import '../css/Scene.css'
import Car from "./Car"
import DummyCar from './DummyCar'



export default function Scene(){


    return(
        <div className="scene-container flex-container">
            <div className="scene">
                <Car />
                <DummyCar />
            </div>
        </div>
    )
}
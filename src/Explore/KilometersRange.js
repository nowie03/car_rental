
import React, { useState } from "react";
import { Slider } from "primereact/slider";
import { InputText } from "primereact/inputtext";

export default function KilometersRange() {
    const [value, setValue] = useState(50);

    return (
        <div >
            <div >
                <InputText value={value} onChange={(e) => setValue(e.target.value)}  />
                <Slider value={value} onChange={(e) => setValue(e.value)} />
            </div>
        </div>
    )
}
        
import React, {useEffect, useRef, useState} from 'react'
import css from './overlay.module.css'


interface OverlayProps {

}

const Overlay: React.FC<OverlayProps> = ({}) => {

    return (
        <div className={css.container} >
            =-=-=-=-=-=-=-=-=-=-=-=-Salut la zone-=-=-=-=-=-=-=-=-=-=-=-=
        </div>
    )
}
export default Overlay;

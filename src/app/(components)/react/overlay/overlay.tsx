import React, {useEffect, useRef, useState} from 'react'
import css from './overlay.module.css'


interface OverlayProps {

}

const Overlay: React.FC<OverlayProps> = ({}) => {

    return (
        <div className={css.container} >
            =-=-=-=-=-=-=-=-Salut la zone-=-=-=-=-=-=-=-=
            <div className={css.topL}></div>
            <div className={css.topR}></div>
            <div className={css.bottL}></div>
            <div className={css.bottR}></div>

        </div>
    )
}
export default Overlay;

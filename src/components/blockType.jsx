import React from 'react'

import './blockType.css'

function Block(props) {
    return(
        <div className={'block '+props.type}>
            {String(props.type).toUpperCase()}
        </div>
    )
}

export default Block
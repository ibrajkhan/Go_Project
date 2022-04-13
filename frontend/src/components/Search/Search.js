import React from 'react'
import "./search.css"

function Search() {
    return (
        <div className='search__container'>
            <div className='search__box'>
                <div className='search__icon'>
                {console.log("search component rendering")}
                </div>
            </div>
        </div>
    )
}

export default React.memo(Search)


import Categories from "./Select/Categories"
import Sort from "./Select/Sort"

const SelectList = () => {
    return (
    <div className="grid grid-cols-12">
        <Categories />
        <Sort />
  </div>
    )
}

export default SelectList
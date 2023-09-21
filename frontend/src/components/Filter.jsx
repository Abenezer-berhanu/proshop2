import { useState } from "react";
import { Link } from "react-router-dom";
import { MdKeyboardArrowDown,MdOutlineKeyboardArrowUp,MdOutlineArrowRight, MdOutlineFilterList } from "react-icons/md";


function Filter() {
  const [visibleElectronics, setVisibleElectronics] = useState(true);
  const [visiblePhone, setVisiblePhone] = useState(false);
  const [visibleLaptop, setVisibleLaptop] = useState(false);
  const [visibleTv, setVisibleTv] = useState(false);
  const [visibleCamera, setVisibleCamera] = useState(false);

  const [visibleAccessory, setVisibleAccessory] = useState(true);

const [visibleClothe, setVisibleClothe] = useState(false);
  const [visibleMen, setVisibleMen] = useState(false);
  const [visibleWomen, setVisibleWomen] = useState(false);
  const [visibleChild, setVisibleChild] = useState(false);


  return (
    <>
      <h5 className="d-flex justify-content-between align-item-center">
        <small>Filter <i><MdOutlineFilterList /></i></small>
      </h5>
      <div className="border border-dark mb-3"></div>
      <div>
        <div className="filter-drop-down">
          <p><strong>Electronics</strong></p>
          <i>
            {visibleElectronics? <MdOutlineKeyboardArrowUp  onClick={() => setVisibleElectronics(!visibleElectronics)}/> : <MdKeyboardArrowDown onClick={() => setVisibleElectronics(!visibleElectronics)} />}
          </i>
        </div>
        <div className={visibleElectronics ? "display-list" : "hide-list"} style={{ padding: '0 10px'}}>
          
        <div>
        <div className="filter-drop-down">
          <p>Phones</p>
          <i>
            {visiblePhone? <MdOutlineKeyboardArrowUp  onClick={() => setVisiblePhone(!visiblePhone)}/> : <MdKeyboardArrowDown onClick={() => setVisiblePhone(!visiblePhone)} />}
          </i>
        </div>
        <div className={visiblePhone ? "display-list" : "hide-list"} style={{ padding: '0 10px'}}>
        <p><MdOutlineArrowRight /><Link to={'/search/category/electronics/phone?name=samsung'}>Samsung</Link></p>
        <p><MdOutlineArrowRight /><Link to={'/search/category/electronics/phone?name=apple'}>Iphone</Link></p>
        <p><MdOutlineArrowRight /><Link to={'/search/category/electronics/phone?name=huawei'}>Huawei</Link></p>
        <p><MdOutlineArrowRight /><Link to={'/search/category/electronics?name=phone'} style={{ textDecoration: 'none'}}>All Phone</Link></p>
        </div>
        </div>
        </div>
        


        <div className={visibleElectronics ? "display-list" : "hide-list"} style={{ padding: '0 10px'}}>
          
        <div>
        <div className="filter-drop-down">
          <p>Laptop</p>
          <i>
            {visibleLaptop? <MdOutlineKeyboardArrowUp  onClick={() => setVisibleLaptop(!visibleLaptop)}/> : <MdKeyboardArrowDown onClick={() => setVisibleLaptop(!visibleLaptop)} />}
          </i>
        </div>
        <div className={visibleLaptop ? "display-list" : "hide-list"} style={{ padding: '0 10px'}}>
        <p><MdOutlineArrowRight /><Link to={'/'}>MacBook</Link></p>
        <p><MdOutlineArrowRight /><Link to={'/'}>HP</Link></p>
        <p><MdOutlineArrowRight /><Link to={'/'}>Lenovo</Link></p>
        <p><MdOutlineArrowRight /><Link to={'/'} style={{ textDecoration: 'none'}}>All Laptops</Link></p>
        </div>
        </div>
        </div>

        <div className={visibleElectronics ? "display-list" : "hide-list"} style={{ padding: '0 10px'}}>
          
        <div>
        <div className="filter-drop-down">
          <p>Camera</p>
          <i>
            {visibleCamera? <MdOutlineKeyboardArrowUp  onClick={() => setVisibleCamera(!visibleCamera)}/> : <MdKeyboardArrowDown onClick={() => setVisibleCamera(!visibleCamera)} />}
          </i>
        </div>
        <div className={visibleCamera ? "display-list" : "hide-list"} style={{ padding: '0 10px'}}>
        <p><MdOutlineArrowRight /><Link to={'/search/category/electronics/camera?name=cannon'}>Cannon</Link></p>
        <p><MdOutlineArrowRight /><Link to={'/search/category/electronics/camera?name=sony'}>Sony</Link></p>
        <p><MdOutlineArrowRight /><Link to={'/search/category/electronics/camera?name=nikon'}>Nikon</Link></p>
        <p><MdOutlineArrowRight /><Link to={'/search/category/electronics?name=camera'} style={{ textDecoration: 'none'}}>All Camera</Link></p>
        </div>
        </div>
        <p><MdOutlineArrowRight /><Link to={'/search?category=electronics'} style={{ textDecoration: 'none'}}>All Electronics</Link></p>
        </div>
        <hr />
        {/* //////////////////////////////////////////////////////////////////// */}

        <div className="filter-drop-down">
          <p><strong>Accessories</strong></p>
          <i>
            {visibleAccessory? <MdOutlineKeyboardArrowUp  onClick={() => setVisibleAccessory(!visibleAccessory)}/> : <MdKeyboardArrowDown onClick={() => setVisibleAccessory(!visibleAccessory)} />}
          </i>
        </div>
        <p><MdOutlineArrowRight /><Link to={'/'}>Phone Accessory</Link></p>
        <p><MdOutlineArrowRight /><Link to={'/'}>Laptop Accessory</Link></p>
        <p><MdOutlineArrowRight /><Link to={'/'} style={{ textDecoration: 'none'}}>All Accessory</Link></p>
        <hr />

        {/* ////////////////////////////////////////////////////////// */}

        <div className="filter-drop-down">
          <p><strong>Clothing</strong></p>
          <i>
            {visibleClothe? <MdOutlineKeyboardArrowUp  onClick={() => setVisibleClothe(!visibleClothe)}/> : <MdKeyboardArrowDown onClick={() => setVisibleClothe(!visibleClothe)} />}
          </i>
        </div>
        <div className={visibleClothe ? "display-list" : "hide-list"} style={{ padding: '0 10px'}}>
          
        <div>
        <div className="filter-drop-down">
          <p>Men's</p>
          <i>
            {visibleMen? <MdOutlineKeyboardArrowUp  onClick={() => setVisibleMen(!visibleMen)}/> : <MdKeyboardArrowDown onClick={() => setVisibleMen(!visibleMen)} />}
          </i>
        </div>
        <div className={visibleMen ? "display-list" : "hide-list"} style={{ padding: '0 10px'}}>
        <p><MdOutlineArrowRight /><Link to={'/'}>Pants</Link></p>
        <p><MdOutlineArrowRight /><Link to={'/'}>Shirt</Link></p>
        <p><MdOutlineArrowRight /><Link to={'/'}>Sweater</Link></p>
        <p><MdOutlineArrowRight /><Link to={'/'}>Shoes</Link></p>
        <p><MdOutlineArrowRight /><Link to={'/'} style={{ textDecoration: 'none'}}>All Men's Clothing</Link></p>
        </div>
        </div>
        </div>
        


        <div className={visibleClothe ? "display-list" : "hide-list"} style={{ padding: '0 10px'}}>
          
        <div>
        <div className="filter-drop-down">
          <p>Women's</p>
          <i>
            {visibleWomen? <MdOutlineKeyboardArrowUp  onClick={() => setVisibleWomen(!visibleWomen)}/> : <MdKeyboardArrowDown onClick={() => setVisibleWomen(!visibleWomen)} />}
          </i>
        </div>
        <div className={visibleWomen ? "display-list" : "hide-list"} style={{ padding: '0 10px'}}>
        <p><MdOutlineArrowRight /><Link to={'/'}>Dresses</Link></p>
        <p><MdOutlineArrowRight /><Link to={'/'}>Skirts</Link></p>
        <p><MdOutlineArrowRight /><Link to={'/'}>Pants</Link></p>
        <p><MdOutlineArrowRight /><Link to={'/'}>Shorts</Link></p>
        <p><MdOutlineArrowRight /><Link to={'/'} style={{ textDecoration: 'none'}}>All Women's Clothing</Link></p>
        </div>
        </div>
        </div>


        <div className={visibleClothe ? "display-list" : "hide-list"} style={{ padding: '0 10px'}}>
          
        <div>
        <div className="filter-drop-down">
          <p>Children</p>
          <i>
            {visibleChild? <MdOutlineKeyboardArrowUp  onClick={() => setVisibleChild(!visibleChild)}/> : <MdKeyboardArrowDown onClick={() => setVisibleChild(!visibleChild)} />}
          </i>
        </div>
        <div className={visibleChild ? "display-list" : "hide-list"} style={{ padding: '0 10px'}}>
        <p><MdOutlineArrowRight /><Link to={'/'}>Dresses</Link></p>
        <p><MdOutlineArrowRight /><Link to={'/'}>Pants</Link></p>
        <p><MdOutlineArrowRight /><Link to={'/'}>shirts</Link></p>
        <p><MdOutlineArrowRight /><Link to={'/'} style={{ textDecoration: 'none'}}>All Children Clothing</Link></p>
        </div>
        </div>
        </div>

        <p><MdOutlineArrowRight /><Link to={'/'} style={{ textDecoration: 'none'}}>All Electronics</Link></p>
        <p><MdOutlineArrowRight /><Link to={'/'} style={{ textDecoration: 'none'}}>Show Trend</Link></p>
        <p><MdOutlineArrowRight /><Link to={'/'} style={{ textDecoration: 'none'}}>Additional</Link></p>
        
        <hr />


        {/* ///////////////////////////////////////////////////////////////// */}
      </div>
    </>
  );
}

export default Filter;

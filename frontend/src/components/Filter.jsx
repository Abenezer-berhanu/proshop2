import { useState } from "react";
import { Link } from "react-router-dom";
import { MdKeyboardArrowDown,MdOutlineKeyboardArrowUp,MdOutlineArrowRight, MdOutlineFilterList } from "react-icons/md";


function Filter() {
  const [visibleElectronics, setVisibleElectronics] = useState(true);
  const [visiblePhone, setVisiblePhone] = useState(false);
  const [visibleLaptop, setVisibleLaptop] = useState(false);
  const [visibleCamera, setVisibleCamera] = useState(false);

  const [visibleAccessory, setVisibleAccessory] = useState(true);

const [visibleClothe, setVisibleClothe] = useState(true);
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
        <p><MdOutlineArrowRight /><Link to={'/search?category=electronics'} style={{ textDecoration: 'none'}}>All Electronics</Link></p>
        <div className="filter-drop-down">
          <p>Phones</p>
          <i>
            {visiblePhone? <MdOutlineKeyboardArrowUp  onClick={() => setVisiblePhone(!visiblePhone)}/> : <MdKeyboardArrowDown onClick={() => setVisiblePhone(!visiblePhone)} />}
          </i>
        </div>
        <div className={visiblePhone ? "display-list" : "hide-list"} style={{ padding: '0 10px'}}>
        <p><MdOutlineArrowRight /><Link to={'/search/category/electronics?name=phone'} style={{ textDecoration: 'none'}}>All Phone</Link></p>
        <p><MdOutlineArrowRight /><Link to={'/search/category/electronics/phone?name=samsung'}>Samsung</Link></p>
        <p><MdOutlineArrowRight /><Link to={'/search/category/electronics/phone?name=apple'}>Iphone</Link></p>
        <p><MdOutlineArrowRight /><Link to={'/search/category/electronics/phone?name=huawei'}>Huawei</Link></p>
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
        <p><MdOutlineArrowRight /><Link to={'/search/category/electronics?name=phone'} style={{ textDecoration: 'none'}}>All Laptops</Link></p>
        <p><MdOutlineArrowRight /><Link to={'/search/category/electronics/laptop?name=apple'}>MacBook</Link></p>
        <p><MdOutlineArrowRight /><Link to={'/search/category/electronics/laptop?name=hp'}>HP</Link></p>
        <p><MdOutlineArrowRight /><Link to={'/search/category/electronics/laptop?name=lenovo'}>Lenovo</Link></p>
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
        <p><MdOutlineArrowRight /><Link to={'/search/category/electronics?name=camera'} style={{ textDecoration: 'none'}}>All Camera</Link></p>
        <p><MdOutlineArrowRight /><Link to={'/search/category/electronics/camera?name=cannon'}>Cannon</Link></p>
        <p><MdOutlineArrowRight /><Link to={'/search/category/electronics/camera?name=sony'}>Sony</Link></p>
        <p><MdOutlineArrowRight /><Link to={'/search/category/electronics/camera?name=nikon'}>Nikon</Link></p>
        </div>
        </div>
        </div>
        <hr />
        {/* //////////////////////////////////////////////////////////////////// */}

        <div className="filter-drop-down">
          <p><strong>Accessories</strong></p>
          <i>
            {visibleAccessory? <MdOutlineKeyboardArrowUp  onClick={() => setVisibleAccessory(!visibleAccessory)}/> : <MdKeyboardArrowDown onClick={() => setVisibleAccessory(!visibleAccessory)} />}
          </i>
        </div>
        <p><MdOutlineArrowRight /><Link to={'/search/category/accessories?name=accessories'} style={{ textDecoration: 'none'}}>All Accessory</Link></p>
        <p><MdOutlineArrowRight /><Link to={'/search/category/accessories/phone?name=accessories'}>Phone Accessory</Link></p>
        <p><MdOutlineArrowRight /><Link to={'/search/category/accessories/laptop?name=accessories'}>Laptop Accessory</Link></p>
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
        <p><MdOutlineArrowRight /><Link to={'/search/category/clothings?name=fashion'} style={{ textDecoration: 'none'}}>All Men's Clothing</Link></p>
        <p><MdOutlineArrowRight /><Link to={'/search/category/clothings/men?name=pants'}>Pants</Link></p>
        <p><MdOutlineArrowRight /><Link to={'/search/category/clothings/men?name=shirt'}>Shirt</Link></p>
        <p><MdOutlineArrowRight /><Link to={'/search/category/clothings/men?name=sweater'}>Sweater</Link></p>
        <p><MdOutlineArrowRight /><Link to={'/search/category/clothings/men?name=shoes'}>Shoes</Link></p>
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
        <p><MdOutlineArrowRight /><Link to={'/search/category/clothings?name=women'} style={{ textDecoration: 'none'}}>All Women's Clothing</Link></p>
        <p><MdOutlineArrowRight /><Link to={'/search/category/clothings/women?name=dress'}>Dresses</Link></p>
        <p><MdOutlineArrowRight /><Link to={'/search/category/clothings/women?name=shoes'}>shoes</Link></p>
        <p><MdOutlineArrowRight /><Link to={'/search/category/clothings/women?name=pants'}>Pants</Link></p>
        <p><MdOutlineArrowRight /><Link to={'/search/category/clothings/women?name=jacket'}>Jacket</Link></p>
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
        <p><MdOutlineArrowRight /><Link to={'/search/category/clothings?name=children'} style={{ textDecoration: 'none'}}>Clothing</Link></p>
        </div>
        </div>
        </div>

        <p><MdOutlineArrowRight /><Link to={'/search/gallery/1/fashion?trend=fashion and design'} style={{ textDecoration: 'none'}}>Fashion gallery</Link></p>
        <p><MdOutlineArrowRight /><Link to={'/'} style={{ textDecoration: 'none'}}>Additional</Link></p>
        
        <hr />


        {/* ///////////////////////////////////////////////////////////////// */}
      </div>
    </>
  );
}

export default Filter;

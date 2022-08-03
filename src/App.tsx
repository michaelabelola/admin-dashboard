import { FC, useEffect, useState } from 'react';
import { Navigate, Route, Routes, useParams } from 'react-router-dom';
import './App.css';
import MainNavigationView from './components/MainNavigationView/MainNavigationView';
import InventoriesPage from './pages/InventoriesPage/InventoriesPage.lazy';
import InventoryNavigation from './components/MainNavigationView/InventoryNavigation/InventoryNavigation.lazy';
import Dashboard from './pages/Dashboard/Dashboard.lazy';
import RegisterInventoryPage from './pages/InventoriesPage/RegisterInventoryPage/RegisterInventoryPage.lazy';
import { InventoriesGroupsSubNavigation, InventoriesListingsSubNavigation, InventoriesSubNavigation } from './components/InventoriesSubNavigation/InventoriesSubNavigation';
import OrdersNavigation from './components/MainNavigationView/InventoryNavigation/OrdersNavigation';
const Redirect: FC<{ to: string }> = (props) => {
  return <Navigate to={`/${useParams().entityId + props.to}`} replace />
}

function App() {
  const [mobile, setMobile] = useState(window.innerWidth < 640 ? true : false);
  const [sideNavOpen, setSideNavOpen] = useState(window.innerWidth < 640 ? false : true);
  // const [windowWidth, setWindowWidth] = useState(undefined as any);
  // console.log(window.innerWidth);
  window.onresize = (ev: UIEvent): any => {
    // setWindowWidth(window.innerWidth);
    // set mobile
    if (window.innerWidth < 640) {
      setMobile(true);
    } else {
      setMobile(false);
    }
    // setWindowWidth(window.innerWidth);

  }
  useEffect(() => {


  }, [])
  return (
    <div data-mode="dark">
      <div className="App flex flex-grow h-full bg-neutral-100 dark:bg-neutral-800">
        {/* w-[18vw] md:w-[18vw] lg:w-[18vw] xl:w-[18vw] */}
        <Routes>
          <Route path="/:entityId" element={<MainNavigationView isMobile={mobile} sideNavOpenState={[sideNavOpen, setSideNavOpen]} />} >
            <Route path={"/:entityId/inventories"} element={<InventoryNavigation isMobile={mobile} sideNavOpenState={[sideNavOpen, setSideNavOpen]} />} >
              <Route element={<Redirect to={"/inventories/all"} />} index />
              <Route path={'/:entityId/inventories/all'} element={<InventoriesSubNavigation />} />
              <Route path={'/:entityId/inventories/groups'} element={<InventoriesGroupsSubNavigation />} />
              <Route path={'/:entityId/inventories/listings'} >
                <Route element={<Redirect to={"/inventories/listings/0"} />} index />
                <Route path={'/:entityId/inventories/listings/0'} element={<InventoriesListingsSubNavigation />} />
              </Route>
              <Route path={"*"} element={<InventoriesSubNavigation />} />
            </Route>

            <Route path={"/:entityId/orders"} element={<OrdersNavigation isMobile={mobile} sideNavOpenState={[sideNavOpen, setSideNavOpen]} />} >
              <Route element={<Redirect to={"/orders/all"} />} index />
              <Route path={'/:entityId/orders/all'} element={<InventoriesSubNavigation />} />
              <Route path={'/:entityId/orders/groups'} element={<InventoriesGroupsSubNavigation />} />
              <Route path={'/:entityId/orders/listings'} >
                <Route element={<Redirect to={"/orders/listings/0"} />} index />
                <Route path={'/:entityId/orders/listings/0'} element={<InventoriesListingsSubNavigation />} />
              </Route>
              <Route path={"*"} element={<InventoriesSubNavigation />} />
            </Route>

            {/* <Route path={"/:entityId/inventories"} >
              <Route element={<Redirect to={"/inventories/all"} />} index />
              <Route path={"*"} element={<InventoryNavigation isMobile={mobile} sideNavOpenState={[sideNavOpen, setSideNavOpen]} />} />
            </Route> */}
            <Route path={"*"} element={<MainNavigationView isMobile={mobile} sideNavOpenState={[sideNavOpen, setSideNavOpen]} />} />
          </Route>
        </Routes>
        <Routes>
          <Route path={"*"} element={<><div className='bg-red-300 p-4 box-border'>
            <div className="bg-green-500">First Page</div>
          </div></>} />

          <Route path="/:entityId">
            <Route element={<Redirect to={"/dashboard"} />} index />
            {/* <Route element={<Redirect to={"/inventories/all"} />} index /> */}
            <Route path={"/:entityId/dashboard"} element={<Dashboard isMobile={mobile} sideNavOpenState={[sideNavOpen, setSideNavOpen]} />} >
              <Route path={"*"} element={<Dashboard isMobile={mobile} sideNavOpenState={[sideNavOpen, setSideNavOpen]} />} />
            </Route>
            <Route path={"/:entityId/inventories"}>
              <Route path={"*"} element={<InventoriesPage isMobile={mobile} sideNavOpenState={[sideNavOpen, setSideNavOpen]} />} />
              <Route path={"/:entityId/inventories/register"} element={<RegisterInventoryPage isMobile={mobile} sideNavOpenState={[sideNavOpen, setSideNavOpen]} />} />
            </Route>
          </Route>
        </Routes>
        {/* <button onClick={() => {

        }} >toggle</button> */}
        {/* <MediaViewer /> */}
      </div>
    </div>
  );
}

export default App;
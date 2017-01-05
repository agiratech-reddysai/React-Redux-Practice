import React from 'react';
import {Link} from 'react-router';

const SideBar = () => (
  <nav className="main-menu">
      <ul>
          <li>
              <a>
                  <i className="fa fa-home fa-2x"></i>
                  <span className="nav-text">
                      Dashboard
                  </span>
              </a>

          </li>
          <li className="has-subnav">
              <Link to ="/retailers">
                  <i className="menu-icon fa fa-table fa-2x"></i>
                  <span className="nav-text">
                      Retailers
                  </span>
              </Link>

          </li>
          <li className="has-subnav">
              <Link to ="/retailerProductConfigurations">
                 <i className="menu-icon fa fa-chain fa-2x"></i>
                  <span className="nav-text">
                      RPC
                  </span>
              </Link>

          </li>
          <li className="has-subnav">
              <Link to ="/produtcts">
                 <i className="menu-icon fa fa-product-hunt fa-2x"></i>
                  <span className="nav-text">
                      Products
                  </span>
              </Link>

          </li>
          <li>
            <Link to ="/shippingAddresses">
                  <i className="menu-icon fa fa-tty fa-2x"></i>
                  <span className="nav-text">
                      Shipping Addresses
                  </span>
            </Link>
          </li>
          <li>
              <Link to ="/retaildashShippingOptions">
                  <i className="menu-icon fa fa-ship fa-2x"></i>
                  <span className="nav-text">
                      Retaildash Shipping
                  </span>
              </Link>
          </li>
          <li>
             <Link to ="/retailerShippingOptions">
                 <i className="menu-icon fa fa-shopping-bag fa-2x"></i>
                  <span className="nav-text">
                      Retailer Shipping
                  </span>
              </Link>
          </li>
          <li>
             <Link to ="/crawlFrequencyConfigurations">
                  <i className="menu-icon fa fa-clock-o fa-2x"></i>
                  <span className="nav-text">
                      Crawl Frequency
                  </span>
              </Link>
          </li>
          <li>
              <Link to ="/loginAccounts">
                 <i className="menu-icon fa fa-sun-o fa-2x"></i>
                  <span className="nav-text">
                      Login Accounts
                  </span>
              </Link>
          </li>
      </ul>

      <ul className="logout">
          <li>
             <a>
                  <i className="fa fa-power-off fa-2x"></i>
                  <span className="nav-text">
                      Logout
                  </span>
              </a>
          </li>
      </ul>
  </nav>
)

export default SideBar;
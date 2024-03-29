import Nav from '../components/Nav';
import Footer from '../components/Footer';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LeftSliders from '../components/LeftSLiders';
import { SvgIcons } from "../components/Button";
import { EditMyProfileModel } from '../components/Model';
import { useDispatch, useSelector } from 'react-redux';

import OutputsOfComponents from '../components/OutputsOfComponents';

const Profile = () => {
  // const dispatch = useDispatch();
  const userProfile = useSelector(state => state.userProfile);

  useSelector(state => console.log(state));

  let userComponents = [];
  console.log(`User comp ${userComponents}`);
  if (userProfile.userComponents && userProfile.userComponents.length > 0) {
    userComponents = userProfile.userComponents;
  } else {
    // console.error("userComponents is empty or undefined");
  }


  return (
    <>
      <Nav />
      <div className="container-fluid d-flex">
        <div className='left_div'>
          <div>
            <LeftSliders />
          </div>
        </div>
        <div className='right_div container '>
          {/* profiles  */}
          <div className='container'>
            <div className='row d-flex bg-grey'>
              <div className="col-2 p-3 ">
                <img className='img-fluid' src={userProfile.userProfile.avatar_url} alt="" />
              </div>
              <div className="col-8 p-3">
                <div><h3 className='fw-bolder'>{userProfile.userProfile.name}</h3></div>
                <div><p className='text-info'>{userProfile.userProfile.bio}</p></div>
                <div><p>{userProfile.userProfile.company}</p></div>
                <div className="d-flex">
                  <div className='pe-2'>
                    <a className='badge text-bg-primary rounded-pill' href={userProfile.userProfile.html_url}>Github</a>
                  </div>
                  <div className='pe-2'>
                    <a className='badge text-bg-success rounded-pill' href={userProfile.userProfile.blog}>Website</a>
                  </div>
                </div>
              </div>
              <div className='col-2'>
                <div className='m-3'>
                  <EditMyProfileModel />
                </div>
                <div className='btn w-80 bg-menuslider m-3 border border-primary'>
                  <div><h4 className='text-primary'>{userProfile.userComponents.length}</h4></div>
                  <span>Total Posts</span>
                </div>
              </div>
            </div>
          </div>
          {/* infos */}
          <div className='d-flex bg-grey my-2 rounded-2 '>
            <div className='p-1 m-2 btn btn-light d-flex align-items-center'>
              <Link className='profile_text' to="/publicvarient">Public Varient</Link>
            </div>
            
            {/* <div className='p-3'>
              <Link className='profile_text' to="/approvals">Waiting for Approvals</Link>
            </div>
            <div className='p-3'>
              <Link className='profile_text' to="/publicvarient">Drafts</Link>
            </div> */}

          <div className='p-1 m-2 btn btn-success '>
              <Link className='profile_text text-light ' to="/contributenew"> <SvgIcons icon={"logo"} />Contribute New </Link>
            </div>

          </div>

          {/* details */}
          <div className='profile_tabs bg-grey'>
          <div>
            <div className="h6 text-center p-3">
              {userProfile.userProfile.name} Contributed Components
            </div>
          </div>
            <div className="container-fluid mb-5 pb-3">
              <div className="gallery_containers">
                {userComponents.map((component, index) => (
                  <div className="box myBoxContainer bg-theme" key={index}>
                    <div className="col rounded-1 d-flex position-relative">
                      <div className="readCode d-flex align-items-center">
                        <div>
                        <SvgIcons icon={"code"} />
                        </div>
                        <Link to={`/${component.post_details.catogries}/${component.post_details.folder_name}`}>
                            <div> Edit code</div>
                        </Link>
                      </div>
                      <div className="box m-1 p-1">
                        {/* Pass HTML, CSS, and JS separately to OutputsOfComponents */}
                        <OutputsOfComponents
                          html={component.component_details.post_details.html}
                          css={component.component_details.post_details.css}
                          js={component.component_details.post_details.js}
                        />
                      </div>
                    </div>
                    <div className="d-flex justify-content-between mt-2">
                      <div>
                        <span>{component.author}</span> {/* Assuming author is a property of your component */}
                      </div>
                      <div>
                        <span>{component.views} Views</span> {/* Assuming views is a property of your component */}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>


          </div>

        </div>
      </div>
      <Footer />
    </>
  )
}

export default Profile;

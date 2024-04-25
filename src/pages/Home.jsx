import React from 'react';
import TextBlock from '../components/TextBlock';
import SideBar from '../components/SideBar';
import ShowData from '../components/ShowData';
import { Link } from 'react-router-dom';
import TabelCom from '../components/TabelCom';


const Home = () => {


  return (

    <section className="w-full h-[99vh] flex items-center justify-center">
      <ShowData />
      <div className="main_box w-full h-full flex items-center justify-between">
        <div className="w-6/12 h-full p-10 pt-2">
          <div className="flex items-center justify-between">
            <h1 className="text-7xl font_z">cal</h1> <h1 className="text-3xl font_z"><Link to="sign-in">sign up</Link></h1>
          </div>
          <div className="side_Bar">
            <SideBar />
          </div>
          <TextBlock />
        </div>
        <TabelCom/>
      </div>
    </section>

  );
};

export default Home;

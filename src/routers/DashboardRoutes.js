import React from 'react';
import { DcScreen } from '../components/dc/DcScreen';
import { MarvelScreen } from '../components/marvel/MarvelScreen';
import { SearchScreen } from '../components/search/SearchScreen';
import { Heroe } from '../components/heroe/Heroe';

import { Route, Routes } from 'react-router-dom';
import { Navbar } from '../components/ui/Navbar';

export const DashboardRoutes = () => {
  return (
    <>
        <Navbar />

        <div className='container'>
          <Routes>
              <Route path="marvel" element={<MarvelScreen />} />
              <Route path="dc" element={<DcScreen />} />
              <Route path="heroe/:heroeId" element={<Heroe />} />

              <Route path="search" element={<SearchScreen />} />

              <Route path="/" element={<MarvelScreen />} />
          </Routes>
        </div>
    </>
  )
}

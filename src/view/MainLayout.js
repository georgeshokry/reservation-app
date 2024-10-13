import React, {useState, useEffect } from 'react';
import { Layout, Typography } from 'antd';
import ReservationsList from '../components/ReservationsList'; 
import ReservationFilters from '../components/ReservationsFilters'


const { Header, Content } = Layout;
const { Title } = Typography;

const LayoutComponent = () => {
  const [reservations, setReservationsData] = useState([]);
  const dateFormate= 'dd.MM.yyyy'

  const [filters, setFilters] = useState({
    search: '',
    status: null,
    shift: null,
    area: null,
    date: null,
  });

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await fetch('/db/data.json');
        const data = await response.json();
        setReservationsData(data.reservations);
        console.log("🚀 ~ fetchReservations ~ data.reservations:", data.reservations.length)
      } catch (error) {
        console.error('Error fetching the reservations:', error);
      }
    };

    fetchReservations();
  }, []); 

  const handleResetFilters = () => {
    setFilters({
      search: '',
      status: null,
      shift: null,
      area: null,
      date: null,
    });
  };


  
  return (
    <Layout>
      <Header style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', backgroundColor: '#001529' }}>
        <Title level={3} style={{ color: 'white', margin: 0 }}>
          Reservations App
        </Title>
      </Header>
      <Content style={{ padding: '20px 50px' }}>
        <ReservationFilters 
          filters={filters} 
          setFilters={setFilters} 
          handleResetFilters={handleResetFilters}  
        />
        <ReservationsList 
          reservations={reservations} 
          filters={filters} 
          dateFormate={dateFormate}
        />
      </Content>
    </Layout>
  );
};

export default LayoutComponent;

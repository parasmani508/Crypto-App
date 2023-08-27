import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { server } from '../index';
import Loader from './Loader';
import { Container, HStack,Button } from '@chakra-ui/react';
import ErrorComponent from './ErrorComponent';
import CoinCard from '../CoinCard';
const Coins = () => {
    const [coins,setCoins]=useState([]);
    const [loading,setLoading]=useState(true);
    const[error,setError]=useState(false);
    const [page,setPage]=useState(1);
    const[currency,setCurrency]=useState("inr");
    const currencySymbol=
    currency==="inr"? "₹": currency==="eur"? "€":"$";
    const changePage=(page)=>
    {
        setPage(page);
        setLoading(true);
    };
    const btns=new Array(132).fill(1);
    useEffect(()=>
    {

        const fetchCoins=async()=>{
        try
        {
            const {data}=await axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${page}`);
        setCoins(data);
        // console.log(data);
        setLoading(false);
        }
        catch(error)
        {
           setError(true);
           setLoading(false);
        }
        };
        fetchCoins();
    },[currency,page]);
 
     if(error) return <ErrorComponent message={"Oops error"}/>
    return (
    <Container maxW={"container.xl"}>{loading?<Loader/>  :<>
    <HStack wrap={"wrap"}>
        {coins.map((i)=>(
           <CoinCard id={i.id} key={i.id} name={i.name} price={i.current_price} img={i.image} symbol={i.symbol} 
           currencySymbol={currencySymbol}/>
        ))}
    </HStack>
    <HStack width={"full"} overflow={"auto"} padding={"8"}>
        {btns.map((item,index)=>
        (
            <Button bgColor={"blackAlpha.700"} key={index} onClick={()=>changePage(index+1)}>{index+1}</Button>
        ))}
    </HStack>
    
    </>}</Container>
  )
}

export default Coins
 
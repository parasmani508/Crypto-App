import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { server } from '../index';
import Loader from './Loader';
import { Container, HStack, Heading, VStack,Image,Text } from '@chakra-ui/react';
import ErrorComponent from './ErrorComponent';
const Exchanges = () => {
    const [exchanges,setExchanges]=useState([]);
    const [loading,setLoading]=useState(true);
    const[error,setError]=useState(false);
    useEffect(()=>
    {

        const fetchExchange=async()=>{
        try
        {
            const {data}=await axios.get(`${server}/exchanges`);
        setExchanges(data);
        setLoading(false);
        }
        catch(error)
        {
           setError(true);
           setLoading(false);
        }
        };
        fetchExchange();
    },[])
 
     if(error) return <ErrorComponent message={"Oops error"}/>
    return (
    <Container maxW={"container.xl"}>{loading?<Loader/>  :<>
    <HStack wrap={"wrap"}>
        {exchanges.map((i)=>(
           <ExchangeCard name={i.name} img={i.image} url={i.url} rank={i.trust_score_rank}/>
        ))}
    </HStack>
    
    </>}</Container>
  )
}

export default Exchanges
 const ExchangeCard=({name,img,url,rank})=>
 (
    <a href={url} target={"blank"}>

        <VStack w={"52"} shadow={"lg"} p="8" borderRadius={"lg"} transition={"all 0.3s"} m={"4"} 
        css={
            {
                "&:hover":{
                    transform:"scale(1.1)",
                },
            }
        }>
            <Image src={img} w={"10"} h={"10"} objectFit={"contain"} alt={"Exchange"}/>
            <Heading size={"md"} noOfLines={1}>{rank}</Heading> 
            <Text noOfLines={1}>{name}</Text>
        </VStack>



    </a>
 )
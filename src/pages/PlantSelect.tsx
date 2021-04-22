import React, { Component, useEffect, useState } from 'react'
import { 
    Text, 
    View ,
    StyleSheet,
    FlatList
} from 'react-native';
import { Environment } from '../components/EnvironmentButton';
import { Header } from '../components/Header';
import { PlantCardPrimary } from '../components/PlantCardPrimary';
import api from '../services/api';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { Load} from '../components/Load';

interface EnvironmentsProps{
    key:string,
    title:string,
}
interface PlantsProps{
      id: string,
      name: string,
      about: string,
      water_tips:string,
      photo: string
      environments: [string],
      frequency: {
        times: number,
        repeat_every: string
      }
}

export function PlantSelect(){
const [environments,setEnvironments] = useState<EnvironmentsProps[]>([]);
const [filteredPlants,setFilteredPlants] = useState<PlantsProps[]>([]);
const [plants,setPlants] = useState<PlantsProps[]>([]);

const [page,setPage] = useState(1);
const [loadingMore,setLoadingMore] =useState(false);
const [loadedAll,setLoadedAll] =useState(false);

const [loading,setLoading] = useState(true);

const [environmentsSelected,setEnvironmentSelected] = useState('all')

function handleEnvironmentSelected(environment:string){
    setEnvironmentSelected(environment);

    if(environment=='all')
        return setFilteredPlants(plants);
    const filtered = plants.filter(plant=>
        plant.environments.includes(environment)
    );    
    setFilteredPlants(filtered);
    

}
    async function fetchPlants() {
        const {data} = await api.get(`plants?_sort=name&_order=asc&_page=${page}&_limit=8`);
        if(!data)
        return setLoading(true);
        if(page>1)  {
        setPlants(oldValue=>[...oldValue,...data])
    }  
        setPlants(data);
        setLoading(false);
        setLoadingMore(false);
    }

function handleFetchMore(distance:number){
    if(distance<1)
        return;
    setLoadingMore(true);
    setPage(oldValue=> oldValue+1);
    fetchPlants();
}


    useEffect(()=>{
        async function fetchEnvironment(){
            const {data} = await api.get('plants_environments?_sort=title&_order=asc');

           
            
            setEnvironments([{
                key:'all',
                title:'Todos'
            },
            ...data
        ]);
       
       
        }
      


        fetchEnvironment();
    },[])

    if(loading)
    return <Load/>
   

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Header/>
                <Text style={styles.title}>
                    Em qual ambiente
                </Text>
                <Text style={styles.subTitle}>
                    Você quer colocar sua planta?
                </Text>
            </View>
            <View>
                <FlatList
                    data={environments}
                    renderItem={({item})=>(
                        <Environment 
                        title={item.title} 
                        active={item.key===environmentsSelected} 
                        onPress={()=>{handleEnvironmentSelected(item.key)}}
                        
                        />

                    )}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.environmentList}
                />
            </View>
            <View style={styles.plants}>
                <FlatList
                    data={filteredPlants}
                    onEndReachedThreshold={0.1}
                    onEndReached={({distanceFromEnd})=> handleFetchMore(distanceFromEnd)}
                    renderItem={({item})=>(
                        <PlantCardPrimary data={item} />

                    )}
                    showsVerticalScrollIndicator={false}
                    numColumns={2}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colors.background,
    },
    header:{
        paddingHorizontal:30
    },
    title:{
        fontSize:17,
        color:colors.heading,
        fontFamily:fonts.heading,
        lineHeight:20,
        marginTop:15,

    },
    subTitle:{
        fontSize:17,
        color:colors.heading,
        fontFamily:fonts.text,
        lineHeight:20,
    },
    environmentList:{
        height:40,
        justifyContent:'center',
        paddingBottom:5,
        marginLeft:32,
        marginVertical:32
    },
    plants:{
        flex:1,
        paddingHorizontal:32,
        justifyContent:'center'
    },
    
})
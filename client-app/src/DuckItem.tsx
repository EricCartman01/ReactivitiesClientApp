import React from 'react';
import { Duck } from './Duck'

interface Props{
    chuck: Duck;
}

export default function DuckItem({chuck}: Props){
    return(
        <div>
            <span>{chuck.name}</span>
            <button onClick={()=> chuck.makeSound(chuck.name + ' quack')}>Make Sound</button>
        </div>  
    )
}
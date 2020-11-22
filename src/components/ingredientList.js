import React from 'react'
import IngredientCard from './ingredientCard';
import { Grid } from '@material-ui/core';

const ingredientList = ({ ingredients }) => {
    const list = () => {
        return ingredients.map(ingredient => {
            return <IngredientCard key={ingredient.id} ingredient={ingredient}/>
        })
    }

    return (
        <div>
            <Grid container spacing={1}>
                {list()}
            </Grid>
        </div>
      );
    
}

export default ingredientList

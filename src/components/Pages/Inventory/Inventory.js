import React, { Fragment, useState, useMemo } from 'react';
import Moment from 'moment';
import { Link } from 'react-router-dom';

import '../Pages.css'

export const Inventory = (props) => {
    const { items } = props;
 
    const [sortConfig, setSortConfig] = useState({});
    const [changeItems, setChangeItems] = useState(items)
    
    // need to pass useMemo function to display the change on the DOM
    const sortedItems = useMemo( () => {
        let sortedItems = [...items];
        if (sortConfig !== null) {
            sortedItems.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortedItems;
    }, [items, sortConfig]);
    
    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    
    const deleteHandler = async (id) => {
        // Filter through props 'items' array, to find ID clicked
        const updateStorage = items.filter(item => item.id !== id);
        console.log('updateStorage', updateStorage) //removes item clicked, consoles new array!!
        
        // Delete orginal local storage and replace with above, need the key 'items', and to pass updatedStorage
        const deletedItem = localStorage.setItem('items', updateStorage);
        console.log(deletedItem)

// filter() find the id of the item you want, then make a new copy to local storage deleting the old one. save all to local storage. 

        // Find item we want from the orignal data with the id. map it.... 
        // need to check id against object keys to find match. 
        // then delete the matched id. 

        // newList should update the state which has props passed into it.... 
        // const newList = changeItems.filter((item) => item.id !== id);
        // console.log('newlist',newList)
        // setChangeItems(newList);
    }

    return (
        <Fragment>
            <div className="page-container">
                <h1 className="page-title">Pantry Inventory</h1>
            </div>
            <div className="container">
                <p>Sort by any value.</p>
                <br></br>
            <table className="table">
                <thead className="table-header">
                    <tr>
                        <th>
                            <button 
                                type="button" 
                                onClick={ () => requestSort('name')}
                                >
                            Name 
                            </button>
                        </th>
                        <th>
                            <button type="button" onClick={ () => requestSort('category')}>
                            Category 
                            </button>
                        </th>
                        <th>
                            <button type="button" onClick={ () => requestSort('location')}>
                            Location 
                            </button>
                        </th>
                        <th>
                            <button type="button" onClick={ () => requestSort('amount')}>
                            Amount 
                            </button>
                        </th>
                        <th>
                            <button type="button" onClick={ () => requestSort('expiry')}>
                            Expiry 
                            </button>
                        </th>
                        <th>
                            Edit
                        </th>
                        <th>
                            Delete
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {sortedItems.map((item) => {
                        // console.log('items', item)
                        // Change date format for display
                        const date = Moment(item.expiry).format('Do MMM YY')
                        // console.log(date)
                        return (
                            <tr key={item.id}>
                                <th>{item.name}</th>
                                <th>{item.category}</th>
                                <th>{item.location}</th>
                                <th>{item.amount}</th>
                                <th>{date}</th>
                                <th><Link to={`/edit/${item}`} >Edit</Link></th>
                                <th>
                                    <button 
                                    onClick={() => deleteHandler(item.id)}
                                    >
                                    Delete</button>
                                </th>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            </div>
        </Fragment>
    );
}

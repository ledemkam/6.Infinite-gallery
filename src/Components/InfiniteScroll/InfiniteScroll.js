import React, {useState, useEffect, useRef} from 'react';
import './InfiniteScroll.css';
import {v4 as uuidv4} from 'uuid'

export default function InfiniteScroll(){
   // we will to have image in form from tree,
    const [dataImg, setDataImg] = useState([[],[],[]])
    //for infinite  scroll we use pageIndex and setPageIndex
    const [pageIndex, setPageIndex] = useState(1);
    //when we want tu seach somethime we use searchState
    // we use random for image random
    const [searchState, setSearchState] = useState("random")
    const [firstCall, setFirstCall] = useState(true)

     
    const infiniteFechtData = () => {
         fetch(`https://api.unsplash.com/search/photos?page=${pageIndex}&per_page=30&query=${searchState}&client_id=nL0GNkbMxftE5KYuZhjusuw8hF1dhjXydLqv4h3LzG4`)
         .then((response) => {
             return response.json()
         })
         .then((data) => {
             //console.log(data);
             const imgsReceived = [];
             data.results.forEach((img) =>{
                 // we push images in tableau,and regular for normal size for image
                 imgsReceived.push(img.urls.regular)
             })

           // now we full state fom linie 7 with images 
           const newFreshState = [
               [...dataImg[0]],
               [...dataImg[1]],
               [...dataImg[2]],
           ]
           let index = 0;
           for(let i =0; i<3; i++){
            for(let j =0; j<10; j++){
                newFreshState[i].push(imgsReceived[index])
                index++;
            }
           }
           setDataImg(newFreshState)
           setFirstCall(false)
         })

         }

         //console.log(dataImg);

         const searchFetchData = () => {

            fetch(`https://api.unsplash.com/search/photos?page=${pageIndex}&per_page=30&query=${searchState}&client_id=TccZKDXp9rzfJUM7avYkdoikF-6NFDgdYhvZF5HiunQ`).then((response) => {
                return response.json()
            })
            .then((data) => {
    
                const imgsReceived = [];
    
                data.results.forEach((img) => {
                    imgsReceived.push(img.urls.regular)
                })
    
                const newFreshState = [
                    [],
                    [],
                    [],
                ]
    
                let index = 0;
                for(let i = 0; i < 3; i++){
                    for(let j = 0; j < 10; j++){
                        newFreshState[i].push(imgsReceived[index])
                        index++;
                    }
                }
    
                setDataImg(newFreshState)
    
            })
    
        }
    
        useEffect(() => {
            if(firstCall) return;
            searchFetchData()
        },[searchState])

   

    useEffect(() =>{

     infiniteFechtData();
        
    },[pageIndex])

    const handlesearch = (e) => {
        e.preventDefault();

        setSearchState(inpRef.current.value);
        setPageIndex(1);
    }

    const inpRef = useRef() ;

    useEffect(() =>{
        window.addEventListener('scroll', infiniteCheck);

        return () => {
            window.removeEventListener('scroll', infiniteCheck)
        }
    },[])

    const infiniteCheck = () => {

        const {scrollTop, scrollHeight, clientHeigt} = document.documentElement;
    
        if(scrollHeight - scrollTop === clientHeigt){
            setPageIndex(pageIndex => pageIndex + 1)
        }
    }

    
    return(
        <div className ="container">
            <form onSubmit={handlesearch}>
                <label htmlFor="search">suchen</label>
                <input type="text" id="search" ref={inpRef}/>
            </form>

            <div className="card-list">
                <div>
                    {dataImg[0].map(img =>{
                        return <img key={uuidv4()} src={img} alt='image unplash'/>
                    })}
                </div>
                <div>
                    {dataImg[1].map(img =>{
                        return <img key={uuidv4()} src={img} alt='image unplash'/>
                    })}
                </div>
                <div>
                    {dataImg[2].map(img =>{
                        return <img key={uuidv4()} src={img} alt='image unplash'/>
                    })}
                </div>
                

            </div>

        </div>
    )
}
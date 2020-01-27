import React from "react";

import CardContainer from "../components/Objects/CardContainer/CardContainer";
import Card from "../components/Objects/Card/Card";
import CardHeader from "../components/Objects/Card/CardHeader";
import CardContent from "../components/Objects/Card/CardContent";
import CardFooter from "../components/Objects/Card/CardFooter";
import FilterContainer from "../components/Filter/FilterContainer";

export default function PostsView() {
   const dummyCards = [
       {
           header: "Test Header"
       },
       {
           header: "Test Header"
       },
       {
           header: "Test Header"
       },
       {
           header: "Test Header"
       },
       {
           header: "Test Header"
       },
       {
           header: "Test Header"
       },
       {
           header: "Test Header"
       },
       {
           header: "Test Header"
       },
       {
           header: "Test Header"
       },
       {
           header: "Test Header"
       },
       {
           header: "Test Header"
       },
       {
           header: "Test Header"
       }
    ];

  /************************************
   * Render
   ************************************/

  return (
    <>
      <div className="posts-view-body">
        <FilterContainer/>
        <CardContainer>
            {dummyCards.map((card, index) => (
                <Card key={index}>
                    <CardHeader text={card.header}/>
                    <CardContent>
                        <br/>
                    </CardContent>
                    <CardFooter>
                        <br/>
                    </CardFooter>
                </Card>
            ))}
        </CardContainer>
      </div>
    </>
  );
};
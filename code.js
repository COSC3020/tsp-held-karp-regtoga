function tsp_hk(distance_matrix) {
    var cities = [];
    for (var i = 0; i < distance_matrix.length; i++){
        cities.push(i);
    }

    var minTour = Infinity;
    //start at every starting location
    for (var i = 0; i < cities.length; i++) {
        var cost = heldKarp(cities, i, distance_matrix);
        if (cost < minTour) {
            minTour = cost;
        }
    }

    if (minTour == Infinity){
        minTour = 0 ;
    }
    return minTour;
}


function heldKarp(cities, start, distance_matrix){
    //cities is an array [0,1,2,3,4] that describes the unvisited cities
    //start is a index in the array of cities that describes where we are in the distance matrix
    //The distance matrix provides us with the weighted paths required to do the problem

    if (cities.length == 2){
        //return length of tour that starts at start, goes directly to other city in cities
        if (cities[0] == start){
            return distance_matrix[start][cities[1]];
        }else{
            return distance_matrix[start][cities[0]];
        }
        
    }else{
        //return the minimum of
        //for each city in cities, unless the city is start
            // reduce the set of cities that are unvisited by one  (the old start), set the new start, add on the distance from old start to new start
            //heldKarp(cities - start, city) + distance from start to city
        var holderofpaths = [];
        var city_minus_start = cities.filter(element => element !== start);

        for (var i = 0; i < cities.length; i++){
            if (cities[i] != start){
                var distance_from_start_to_city = distance_matrix[start][cities[i]];
                holderofpaths.push(heldKarp(city_minus_start, cities[i], distance_matrix) + distance_from_start_to_city);
            }
            
        }

        return Math.min(...holderofpaths);
    }
}
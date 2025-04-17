function tsp_hk(distance_matrix) {
    var cities = [];
    for (var i = 0; i < distance_matrix.length; i++){
        cities.push(i);
    }

    //This selects multiple start cites over time. i is the start city.
    var minTour = Infinity;
    for (var i = 0; i < cities.length; i++) {
        var memo = {};
        var cost = heldKarp(cities, i, distance_matrix, memo);
        if (cost < minTour) {
            minTour = cost;
        }
    }

    if (minTour == Infinity){
        minTour = 0 ;
    }
    return minTour;
}


function heldKarp(cities, start, distance_matrix, memo){
    var key = cities.sort() + " divider " + start;
    if (memo[key] != undefined) {
        return memo[key];
    }

    if (cities.length == 2){
        let result;
        if (cities[0] == start){
            result = distance_matrix[start][cities[1]];
        } else {
            result = distance_matrix[start][cities[0]];
        }
        memo[key] = result;
        return result;
    } else {
        var holderofpaths = [];
        var city_minus_start = cities.filter(element => element !== start);

        for (var i = 0; i < cities.length; i++){
            //here i pick a new start city that is not the old start city.
            if (cities[i] != start){
                var distance_from_start_to_city = distance_matrix[start][cities[i]];
                holderofpaths.push(
                    heldKarp(city_minus_start, cities[i], distance_matrix, memo) + distance_from_start_to_city
                );
            }
        }

        memo[key] = Math.min(...holderofpaths);
        return memo[key];
    }
}
console.log("script is working");

document.addEventListener("DOMContentLoaded", () => {
  const populate = async (value, currency) => {
    let myStr = "";
    let options = "";
    let search = document.querySelector("select[name='Search']").value

    

    let url = `https://api.currencyapi.com/v3/latest?apikey=cur_live_B2mC9pSExH7sm5ppCE6UjHJALrt8ITP71at74asE&base_currency=${currency}`;

    try {
      let response = await fetch(url);
      let rJson = await response.json();
      if (search) {
        rJson["data"] = Object.fromEntries(
          Object.entries(rJson["data"]).filter(([key, value]) => value.code === search)
        );
      }
      
      console.log(rJson);

    
      for (let key in rJson["data"]) {
        myStr += `  
          <tr>
            <td>${rJson["data"][key]["code"]}</td>

            <td>${rJson["data"][key]["code"]}</td>
             <td>${((rJson["data"][key]?.value || 0) * value).toFixed(4)}</td>
          </tr>
        `;
      }
      for(let key in rJson["data"]){
       options +=`
        <option value=${key}>${rJson["data"][key]["code"]}</option>
       `
      }

      const CurrencyOptions= document.querySelector("select[name='Search']")
      if(CurrencyOptions){
        CurrencyOptions.innerHTML = options;
      }
      const tableBody = document.querySelector("tbody");
      if (tableBody) {
        tableBody.innerHTML = myStr;
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }

    const output = document.querySelector(".output");
    output.style.display = "block"; // Change text color

    const Search = document.querySelector(".Search");
    Search.style.display = "block"; // Change text color
    search= null
    
  };
    

  const CurrencySearch = document.querySelector("button[name='Search']")
  CurrencySearch.addEventListener("click", (e)=>{
    
    e.preventDefault();
    const value = parseInt(document.querySelector("input[name='quantity']").value);
      console.log( "value",value)
      const currency = document.querySelector("select[name='Currency']").value;

     value ? populate(value, currency): alert("Enter Quantity")
    
  })

  const btn = document.querySelector(".btn");



    btn.addEventListener("click", (e) => {
      e.preventDefault();
      console.log("Button is Clicked");

    
      const value = parseInt(document.querySelector("input[name='quantity']").value);
      console.log( "value",value)
      const currency = document.querySelector("select[name='Currency']").value;

     value ? populate(value, currency): alert("Enter Quantity")
      

    });
  
});

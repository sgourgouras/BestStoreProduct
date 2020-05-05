(function() { 
	let template = document.createElement("template");
    template.innerHTML = `
        <div class="flexbox">
            <h2>Top 1 Product - <span store></span></h2>
            <img couv alt="couverture" />
            <h3 title></h3>
            <p genre></p>
            <p nbSold></p>
        </div>
		<style>
		:host {
			border-radius: 25px;
			border-width: 4px;
			border-color: black;
			border-style: solid;
            display: block;
            padding: 1rem;
        } 
        .flexbox {
            width:100%;
            height:100%;
            display:flexbox;
            flex-direction:column;
            justify-content:strech;
        }
		</style> 
	`;

	class BestStoreProduct extends HTMLElement {
		constructor() {
			super(); 
			let shadowRoot = this.attachShadow({mode: "open"});
            shadowRoot.appendChild(template.content.cloneNode(true));
            
            this._magasin   = this.shadowRoot.querySelector("[store]");
            this._couv      = this.shadowRoot.querySelector("[couv]");
            this._title     = this.shadowRoot.querySelector("[title]");
            this._nbSold    = this.shadowRoot.querySelector("[nbSold]");
            this._genre     = this.shadowRoot.querySelector("[genre]");

            this._couv.setAttribute("src", "test");
            this._magasin.innerHTML = "toto";
            this._title.innerHTML = "oProduct.title";
            this._nbSold.innerHTML = "oProduct.nbSold";

			window.addEventListener("click", event => {
				var event = new Event("onClick");
				this.dispatchEvent(event);
			});
			this._props = {};
		}

		onCustomWidgetBeforeUpdate(changedProperties) {
            this._props = { ...this._props, ...changedProperties };
            if ("store" in changedProperties) {
				getProductData(changedProperties["store"])
			}
		}

		onCustomWidgetAfterUpdate(changedProperties) {
            if ("store" in changedProperties) {
				this._store = changedProperties["store"];
			}
        }
        
        getProductData(sMagasin) {
            var oProduct = {
                id: "15",
                title: "Livre" + sMagasin,
                nbSold: 10000 * Math.random(),
                genre: "Thriller",
                couv: "https://github.com/sgourgouras/BestStoreProduct/" + oProduct.id + ".png"
            }
            this._couv.setAttribute("src", oProduct.couv);
            this._magasin.innerHTML = sMagasin;
            this._title.innerHTML = oProduct.title;
            this._nbSold.innerHTML = oProduct.nbSold;
        }
	}

	customElements.define("best-store-product", BestStoreProduct);
})();
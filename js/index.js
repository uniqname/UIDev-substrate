// How do I import json into an html file?

// function loadJSON(filelocation, callback) {
//     var xobj = new XMLHttpRequest();
//     xobj.overrideMimeType("application/json");
//     xobj.open("GET", filelocation, true); // Replace 'my_data' with the path to your file
//     xobj.onreadystatechange = function () {
//       if (xobj.readyState == 4 && xobj.status == "200") {
//         // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
//         callback(xobj.responseText);
//       }
//     };
//     xobj.send(null);
// }

// function init() {
//   var location = "gallery.json";
//   loadJSON((filelocation = location), function (response) {
//     // Parse JSON string into object
//     const loadedJSON = JSON.parse(response);
//     console.log(loadedJSON);
//   });
// }

// init();

// Never had to use the Fetch API because I typically use Axios.
// But I was about to replace the LoadJSON function with this
// fetch("gallery.json")
//   .then((response) => response.text())
//   .then((data) => console.log(JSON.parse(data)));

// I have never had to write anything but JSX in a react app.
// I have only ever used create-react-app... never my own toolchain

const e = React.createElement;

// class Carousel extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { liked: false };
//   }

//   render() {
//     if (this.state.liked) {
//       return "You liked this.";
//     }

//     return e(
//       "button",
//       { onClick: () => this.setState({ liked: true }) },
//       "Like"
//     );
//   }
// }

function Carousel() {
  const [data, setData] = React.useState([]);
  const [displayedImageIndex, setDisplayedImageIndex] = React.useState(0);
  //   const [imageData, setImageData] = React.useState([]);

  // using a ref here to trigger imperative animations
  const imageRef = React.useRef(null);

  React.useEffect(() => {
    fetch("gallery.json")
      .then((response) => response.text())
      .then((data) => {
        const carouselData = JSON.parse(data);
        setData(carouselData);
        // const container = [];
        // I dont think I need to preload local assets
        // this may be handled in the index.html
        // carouselData.photos.forEach((image) => {
        //   preLoadImage(image.src)
        //     .then((res) => {
        //       container.push(res);
        //       // append the res... which is an image element to the page with a style of display:hidden
        //       // How do I append an image element to the return?
        //     })
        //     // TODO: remove console.log and handle error properly
        //     .catch((error) => console.log(error))
        //     .finally(() => {
        //       setImageData(container);
        //     });
        // });
      });
  }, []);

  const updateIndex = (index) => {
    // if (imageRef && imageRef.current) {
    //   // add animation class here
    //   imageRef.current.className = "animate-left";
    //   console.log(imageRef.current);
    // }
    // setTimeout(() => {
    if (index > 7) {
      setDisplayedImageIndex(0);
    } else if (index < 0) {
      setDisplayedImageIndex(7);
    } else {
      setDisplayedImageIndex(index);
    }
    // }, 2000);
  };

  //   const preLoadImage = (imageSource) => {
  //     return new Promise((resolve, reject) => {
  //       const img = new Image();

  //       img.onload = () => {
  //         resolve(img);
  //       };

  //       img.onerror = () => {
  //         reject(img);
  //       };

  //       img.src = imageSource;
  //     });
  //   };

  return data?.photos?.length > 0
    ? e(
        "div",
        { className: "carousel center-aligned" },
        e("img", { src: data.photos[displayedImageIndex].src, ref: imageRef }),
        e(
          "div",
          { className: "button-container" },
          e(
            "button",
            { onClick: () => updateIndex(displayedImageIndex - 1) },
            e("div", { className: "arrow-left" }, null)
          ),
          e(
            "button",
            { onClick: () => updateIndex(displayedImageIndex + 1) },
            e("div", { className: "arrow-right" }, null)
          )
        ),
        e(
          "div",
          { className: "dot-container" },
          e(
            "div",
            {
              className: `dot ${displayedImageIndex === 0 ? "active" : null}`,
              onClick: () => updateIndex(0),
            },
            null
          ),
          e(
            "div",
            {
              className: `dot ${displayedImageIndex === 1 ? "active" : null}`,
              onClick: () => updateIndex(1),
            },
            null
          ),
          e(
            "div",
            {
              className: `dot ${displayedImageIndex === 2 ? "active" : null}`,
              onClick: () => updateIndex(2),
            },
            null
          ),
          e(
            "div",
            {
              className: `dot ${displayedImageIndex === 3 ? "active" : null}`,
              onClick: () => updateIndex(3),
            },
            null
          ),
          e(
            "div",
            {
              className: `dot ${displayedImageIndex === 4 ? "active" : null}`,
              onClick: () => updateIndex(4),
            },
            null
          ),
          e(
            "div",
            {
              className: `dot ${displayedImageIndex === 5 ? "active" : null}`,
              onClick: () => updateIndex(5),
            },
            null
          ),
          e(
            "div",
            {
              className: `dot ${displayedImageIndex === 6 ? "active" : null}`,
              onClick: () => updateIndex(6),
            },
            null
          ),
          e(
            "div",
            {
              className: `dot ${displayedImageIndex === 7 ? "active" : null}`,
              onClick: () => updateIndex(7),
            },
            null
          )
        )
      )
    : "Data was not Loaded";
}

const domContainer = document.querySelector("#js-carousel");
ReactDOM.render(e(Carousel), domContainer);

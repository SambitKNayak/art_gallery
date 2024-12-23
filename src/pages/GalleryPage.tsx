import React, { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Modal from 'react-bootstrap/Modal';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import './GalleryPage.scss';

// Dynamically import all images in assets folder
const images = import.meta.glob('../assets/*.jpg', { eager: true });

const GalleryPage: React.FC = () => {
  const [imageList, setImageList] = useState<string[]>(Object.values(images).map((img: any) => img.default));
  const [hasMore, setHasMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [currentImage, setCurrentImage] = useState<string | null>(null);

  const fetchMoreImages = () => {
    if (imageList.length >= 100) {
      setHasMore(false);
      return;
    }

    setTimeout(() => {
      setImageList((prev) => [...prev, ...prev.slice(0, 10)]);
    }, 1500);
  };

  const openModal = (image: string) => {
    setCurrentImage(image);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setCurrentImage(null);
  };

  return (
    <div className="gallery-page">
      {/* Navbar */}
      <Navbar bg="dark" variant="dark" sticky="top">
        <Container>
          <Navbar.Brand href="#">Art Gallery</Navbar.Brand>
        </Container>
      </Navbar>

      {/* Title */}
      <Container className="text-center my-4">
        <h1 className="gallery-title">My Stunning Art Gallery</h1>
        <p className="lead">Explore and immerse yourself in beautiful artworks</p>
      </Container>

      {/* Infinite Scroll with Image Grid */}
      <InfiniteScroll
        dataLength={imageList.length}
        next={fetchMoreImages}
        hasMore={hasMore}
        loader={<h4 className="text-center">Loading more images...</h4>}
      >
        <Container>
          <div className="row g-3">
            {imageList.map((image, index) => (
              <div className="col-md-3 col-sm-6" key={index}>
                <div
                  className="card shadow-sm"
                  onClick={() => openModal(image)}
                  style={{ cursor: 'pointer', overflow: 'hidden' }}
                >
                  <img
                    src={image}
                    alt={`Artwork ${index + 1}`}
                    className="card-img-top img-fluid hover-zoom"
                  />
                  <div className="card-body text-center">
                    <h5 className="card-title">Artwork {index + 1}</h5>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </InfiniteScroll>

      {/* Modal */}
      <Modal show={showModal} onHide={closeModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Artwork Details</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex justify-content-center">
          <img
            src={currentImage!}
            alt="Enlarged artwork"
            className="img-fluid rounded shadow"
            style={{ maxHeight: '70vh' }}
          />
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={closeModal}>
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default GalleryPage;


// =======================================================

// import React, { useState } from 'react';
// import InfiniteScroll from 'react-infinite-scroll-component';
// import './GalleryPage.scss';

// // Dynamically import all images in assets folder
// const images = import.meta.glob('../assets/*.jpg', { eager: true });

// const GalleryPage: React.FC = () => {
//   const [imageList, setImageList] = useState<string[]>(Object.values(images).map((img: any) => img.default));
//   const [hasMore, setHasMore] = useState(true);

//   const fetchMoreImages = () => {
//     // Simulate infinite scrolling
//     if (imageList.length >= 100) {
//       setHasMore(false);
//       return;
//     }

//     setTimeout(() => {
//       setImageList((prev) => [...prev, ...prev.slice(0, 10)]);
//     }, 1500);
//   };

//   return (
//     <div className="gallery-page">
//       <h1 className="gallery-title">My Art Gallery</h1>
//       <InfiniteScroll
//         dataLength={imageList.length}
//         next={fetchMoreImages}
//         hasMore={hasMore}
//         loader={<h4>Loading...</h4>}
//       >
//         <div className="image-grid">
//           {imageList.map((image, index) => (
//             <img key={index} src={image} alt={`Artwork ${index + 1}`} className="gallery-image" />
//           ))}
//         </div>
//       </InfiniteScroll>
//     </div>
//   );
// };

// export default GalleryPage;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import image1 from '../img/download.svg';
import image2 from '../img/download (1).svg';
import image3 from '../img/download (2).svg';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import banner from '../img/banner_coconut.png'
import './homepage.css'
import Carousel from 'react-bootstrap/Carousel';
import ExampleCarouselImage1 from '../img/Frame 2.png'
import ExampleCarouselImage2 from '../img/Frame 2.png'

export default function Spices() {
    const [spicesProducts, setSpicesProducts] = useState([]);
    const [coconutProducts, setCoconutProducts] = useState([]);
    const [show, setShow] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [ratingValue, setRatingValue] = useState(0);

    const handleClose = () => {
        setShow(false);
        window.location.reload(); // Refresh the page
    };
    const handleShow = () => setShow(true);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/products/product');
            const allProducts = response.data.data;
            const spices = allProducts.filter(product => product.type === "Spices Product");
            const coconuts = allProducts.filter(product => product.type === "Coconut Product");
            setSpicesProducts(spices);
            setCoconutProducts(coconuts);
            console.log(allProducts)
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const saveRating = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/products/rating', {
                productId: selectedProductId,
                ratingValue: ratingValue
            });
            console.log(response.data);
            handleClose();
        } catch (error) {
            console.error('Error saving rating:', error);
        }
    };




    return (
        <div>
            <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
                <ol class="carousel-indicators">
                    <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                </ol>
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img class="d-block w-100" src={ExampleCarouselImage1} alt="First slide" />
                    </div>
                    <div class="carousel-item">
                        <img class="d-block w-100" src={ExampleCarouselImage2} alt="Second slide" />
                    </div>
                </div>
                <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                </a>
                <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                </a>
            </div>
            <div className="container mt-5  mb-5">
                <h2 className='text-center border-bottom fw-bold'>Spices Products</h2>
                <div className="row">
                    {spicesProducts.map(product => (
                        <div className="col-md-3" key={product._id}>
                            <section class="box">
                                <div class="content">
                                    <div class="left">
                                        <div class="product_img">
                                            <img className="card-img-top" src={product.image} alt={product.name} />
                                        </div>
                                        <div class="product_details">
                                            <h4 class="title">{product.name}</h4>
                                            <p class="discription">{product.description}</p>
                                            <p class="price">Rs {product.price - (product.price * product.discount / 100)} <span class="price_original">RS : {product.price}</span> <span class="offer">  {product.discount} % OFF</span></p>
                                            <p class="other">inclusive of all taxes</p>
                                            <Button variant="primary" className='w-100 rating-btn' onClick={() => { setSelectedProductId(product._id); handleShow(); }}>
                                                Add a Rate
                                            </Button>
                                            <p>Ratings: {product.averageRating}</p>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    ))}
                </div>
            </div>

          

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Rate Product</Modal.Title>
                </Modal.Header>
                <Modal.Body className='text-center'>
                    <p className='h3'>Add your valueble rating</p>
                    <div class="rating">
                        <input type="radio" id="star5" name="rating" value="5" onChange={() => setRatingValue(5)} />
                        <label for="star5">5</label>
                        <input type="radio" id="star4" name="rating" value="4" onChange={() => setRatingValue(4)} />
                        <label for="star4">4</label>
                        <input type="radio" id="star3" name="rating" value="3" onChange={() => setRatingValue(3)} />
                        <label for="star3">3</label>
                        <input type="radio" id="star2" name="rating" value="2" onChange={() => setRatingValue(2)} />
                        <label for="star2">2</label>
                        <input type="radio" id="star1" name="rating" value="1" onChange={() => setRatingValue(1)} />
                        <label for="star1">1</label>
                    </div>

                </Modal.Body>

                <Modal.Footer>
                    <Button variant="primary" className='w-100' onClick={saveRating}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>


        </div>


    );
}

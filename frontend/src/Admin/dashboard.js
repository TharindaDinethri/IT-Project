import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import logo from '../img/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
 


export default function Dashboard() {
  const [show, setShow] = useState(false);
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    discount: '',
    productId: '',
    image: null,
    type: ''
  });

  const generatePDF = () => {
    const input = document.getElementById('pdf-content');
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        const imgWidth = 210; // A4 width in mm
        const imgHeight = canvas.height * imgWidth / canvas.width;

        // Add organizational details
        pdf.setFont("helvetica", "bold"); // Set font to bold
        pdf.setFontSize(12); // Set font size for organizational details
        pdf.text('SUN RICH PARADISE', 30, 10); // Position and text for company name
        pdf.setFontSize(9);
        pdf.text('Address: Street Address, City, State, ZIP', 30, 15); // Position and text for address
        pdf.text('Phone: +1234567890', 30, 20); // Position and text for phone number
        pdf.text('Email: info@company.com', 30, 25); // Position and text for email
        pdf.setFont("helvetica", "bold"); // Set font to bold
        pdf.setFontSize(15); // Set font size for organizational details
        pdf.text('PRODUCT REPORT', 80, 40); // Position and text for company name

        // templateImage is the company logo
        pdf.addImage(imgData, 'PNG', 0, 50, imgWidth, imgHeight); // Adjust Y position to start below organizational details
        pdf.addImage(logo, 'PNG', 160, 5, 20, 20); // Adjust position and dimensions as needed

        pdf.save("productReport.pdf");
      });
  };



  const [showEditModal, setShowEditModal] = useState(false);

  const [editProduct, setEditProduct] = useState({
    name: '',
    description: '',
    price: '',
    discount: '',
    productId: '',
    image: null,
    type: ''
  });
  const [products, setProducts] = useState([]);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [selectedProductIdToDelete, setSelectedProductIdToDelete] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products/product');
      setProducts(response.data.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };
  const handleEditImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setEditProduct({ ...editProduct, image: reader.result });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };


  const handleClose = () => setShow(false);
  const handleCloseEditModal = () => setShowEditModal(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const existingProduct = products.find((p) => p.productId === product.productId);
      if (existingProduct) {
        toast.error('Product with the same Product ID already exists!');
        return;
      }

      await axios.post('http://localhost:5000/api/products', product);
      handleClose();

      toast.success('Product added successfully', {
        autoClose: 3000
      });
      fetchProducts();

    } catch (error) {
      console.error('Error adding product:', error);
    }
  };


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setProduct({ ...product, image: reader.result });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleShow = () => {
    setProduct({
      name: '',
      description: '',
      price: '',
      discount: '',
      productId: '',
      image: null,
      type: ''
    });
    setShow(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditProduct({ ...editProduct, [name]: value });
  };


  const handleShowEditModal = (product) => {
    setEditProduct({
      _id: product._id,
      name: product.name,
      description: product.description,
      price: product.price,
      discount: product.discount,
      productId: product.productId,
      image: product.image,
      type: product.type
    });
    setShowEditModal(true);
  };

  const handleEditSubmit = async () => {
    try {
      await axios.put(`http://localhost:5000/api/products/${editProduct._id}`, editProduct);
      handleCloseEditModal();
      toast.success('Product updated successfully', { autoClose: 3000 });
      fetchProducts();
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleDeleteConfirmation = (productId) => {
    console.log("Selected product ID to delete:", productId);
    setSelectedProductIdToDelete(productId);
    setShowDeleteConfirmation(true);
  };



  const handleDeleteProduct = async () => {
    try {
      // Check if selectedProductIdToDelete is defined
      if (selectedProductIdToDelete) {
        await axios.delete(`http://localhost:5000/api/products/${selectedProductIdToDelete}`);
        toast.success('Product deleted successfully', { autoClose: 3000 });
        fetchProducts();
        setShowDeleteConfirmation(false);
      } else {
        console.error('Error deleting product: No product ID selected');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };


  return (
    <div className='container'>
      <div className='row text-center'>
        <div className='col-md-3'>
          <Button variant="outline-primary" className='w-100' onClick={handleShow}>Add Product</Button>
        </div>
        <div className='col-md-3'>
          <Button variant="outline-primary" className='w-100' href='/rating'>Ratings</Button>
        </div>
      </div>

      {/* --------------Add Product Modal Open------------------- */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>

          <Modal.Title>Add Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="productName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={product.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="productDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={product.description}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="productPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={product.price}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="productType">
              <Form.Label>Type</Form.Label>
              <Form.Control
                as="select"
                name="type"
                value={product.type}
                onChange={handleChange}
                required
              >
                <option value="">Select type</option>
                <option value="Cocount Product">Cocount Product</option>
                <option value="Spices Product">Spices Product</option>
              </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3" controlId="productDiscount">
              <Form.Label>Discount</Form.Label>
              <Form.Control
                type="number"
                name="discount"
                value={product.discount}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="productID">
              <Form.Label>Product ID</Form.Label>
              <Form.Control
                type="text"
                name="productId"
                value={product.productId}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="productImage">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                name="image"
                onChange={handleImageChange}
                required
              />
            </Form.Group>

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      {/* --------------Add Product Modal Close------------------- */}
      <ToastContainer />
      <div > 
      <FontAwesomeIcon icon={faSearch} style={{ position: "absolute", top: "155px", right: "800px", zIndex: "1", color: "blue" }} />
        <input
        type="text"
        className="form-control mb-3"
        placeholder="Search by product name"
        value={searchQuery}
        style={{ marginTop: "10px", width: "556px" ,borderColor: "blue"}}
        onChange={handleSearchInputChange}
        
      /></div>
     
      
      {/* --------------Show Product Table Open------------------- */}
      <div className='container' >
        <h2 className='mt-4 mb-4'>Product List</h2>
        <div id='pdf-content'>
          <Table striped bordered hover >
            <thead>
              <tr className='text-center'>
                <th>Name</th>
                <th>Description</th>
                <th>Normal Price</th>
                <th>Discount(%)</th>
                <th>Product ID</th>
                <th>Type</th>
                <th>Image</th>
                <th>Action</th>

              </tr>
            </thead>
            <tbody className='text-center'>
              {filteredProducts.map((product) => (
                <tr key={product._id}>
                  <td>{product.name}</td>
                  <td>{product.description}</td>
                  <td>Rs: {product.price}</td>
                  <td>{product.discount} % </td>
                  <td>{product.productId}</td>
                  <td>{product.type}</td>
                  <td>
                    {product.image && (
                      <img src={product.image} alt="Product" style={{ maxWidth: '100px' }} />
                    )}
                  </td>
                  <td className='text-center'>
                    <Button variant="outline-info" onClick={() => handleShowEditModal(product)}>Edit</Button>{' '}
                    <Button variant="outline-danger" onClick={() => handleDeleteConfirmation(product._id)}>Delete</Button>{' '}

                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
      <Button variant="primary" onClick={generatePDF}>
        Download PDF
      </Button>
      {/* --------------Show Product Table Close------------------- */}
      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="editProductName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={editProduct.name}
                onChange={handleEditChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="editProductDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={editProduct.description}
                onChange={handleEditChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="editProductPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={editProduct.price}
                onChange={handleEditChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="editProductType">
              <Form.Label>Type</Form.Label>
              <Form.Control
                as="select"
                name="type"
                value={editProduct.type}
                onChange={handleEditChange}
                required
              >
                <option value="">Select type</option>
                <option value="Cocount Product">Cocount Product</option>
                <option value="Spices Product">Spices Product</option>
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" controlId="editProductDiscount">
              <Form.Label>Discount</Form.Label>
              <Form.Control
                type="number"
                name="discount"
                value={editProduct.discount}
                onChange={handleEditChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="editProductID">
              <Form.Label>Product ID</Form.Label>
              <Form.Control
                type="text"
                name="productId"
                value={editProduct.productId}
                onChange={handleEditChange}
                required
                disabled
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="editProductImage">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                name="image"
                onChange={handleEditImageChange}
              />
              {editProduct.image && (
                <img
                  src={editProduct.image}
                  alt="Product"
                  style={{ maxWidth: '100px', marginTop: '10px' }}
                />
              )}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEditSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteConfirmation} onHide={() => setShowDeleteConfirmation(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this product?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteConfirmation(false)}>No</Button>
          <Button variant="danger" onClick={handleDeleteProduct}>Yes</Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
}



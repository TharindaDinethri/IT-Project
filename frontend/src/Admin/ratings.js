import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

export default function Ratings() {
  const [ratings, setRatings] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
    fetchRatings();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products/product');
      setProducts(response.data.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchRatings = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/products/ratings');
      const data = await response.json();
      if (data.success) {
        setRatings(data.data);
      } else {
        console.error('Failed to fetch ratings:', data.error);
      }
    } catch (error) {
      console.error('Error fetching ratings:', error);
    }
  };

  const handleDeleteRating = async (ratingId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/products/ratings/${ratingId}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      if (data.success) {
        setRatings(ratings.filter(rating => rating._id !== ratingId));
        toast.success('Rating deleted successfully', { autoClose: 3000 });
      } else {
        console.error('Failed to delete rating:', data.error);
      }
    } catch (error) {
      console.error('Error deleting rating:', error);
    }
  };

  const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
      backgroundColor: '#E4E4E4',
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
    },
  });

  const MyDocument = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>Product Name</Text>
          {products.map((product) => (
            <Text key={product._id}>{product.name}</Text>
          ))}
        </View>
        <View style={styles.section}>
          <Text>Rating Value</Text>
          {ratings.map((rating) => (
            <Text key={rating._id}>{rating.ratingValue}</Text>
          ))}
        </View>
      </Page>
    </Document>
  );

  return (
    <div className="container mt-5 mb-5">
      <h2 className="text-center">All Ratings</h2>
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Rating Value</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {ratings.map((rating) => (
              <tr key={rating._id}>
                <td>{products.find(product => product._id === rating.productId)?.name}</td>
                <td>{rating.ratingValue}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDeleteRating(rating._id)} 
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <PDFDownloadLink document={<MyDocument />} fileName="ratings.pdf">
        {({ blob, url, loading, error }) =>
          loading ? 'Loading document...' : 'Download PDF'
        }
      </PDFDownloadLink>
    </div>
  );
}

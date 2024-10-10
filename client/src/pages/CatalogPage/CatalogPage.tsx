import React, { useState, useEffect, useCallback } from 'react';
import CatalogForm from '../../components/CatalogForm/CatalogForm';
import CatalogList from '../../components/CatalogList/CatalogList';
import { fetchCatalogs, addCatalog, updateCatalog, deleteCatalog, deleteCatalogs } from '../../api';
import {
  PageWrapper,
  Section,
  Title,
  BulkDeleteButton,
  Error,
  Pagination,
  PageButton,
} from './CatalogPageStyles';

interface Catalog {
  _id: string;
  name: string;
  vertical: string;
  isPrimary: boolean;
  locales: string[];
  indexedAt: string;
}

const CatalogPage: React.FC = () => {
  const [catalogs, setCatalogs] = useState<Catalog[]>([]);
  const [selectedCatalogs, setSelectedCatalogs] = useState<string[]>([]);
  const [editingCatalog, setEditingCatalog] = useState<Catalog | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

  const [currentPage, setCurrentPage] = useState(1);
  const [catalogsPerPage] = useState(10);
  const [totalCatalogs, setTotalCatalogs] = useState(0);

  const loadCatalogs = async () => {
    if (!token) {
      window.location.href = '/login';
      return;
    }

    try {
      const data = await fetchCatalogs(token, currentPage, catalogsPerPage);
      setCatalogs(data.catalogs);
      setTotalCatalogs(data.totalCount);
    } catch (error) {
      const err = error as any;
      if (err.message === 'No token found' || err.response?.status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
    }
  };

  const checkTokenAndLoadCatalogs = useCallback(() => {
    const updatedToken = localStorage.getItem('token');
    setToken(updatedToken);

    if (!updatedToken) {
      window.location.href = '/login';
    } else {
      loadCatalogs();
    }
  }, [currentPage]);

  useEffect(() => {
    checkTokenAndLoadCatalogs();
    window.addEventListener('storage', checkTokenAndLoadCatalogs);

    return () => {
      window.removeEventListener('storage', checkTokenAndLoadCatalogs);
    };
  }, [token, checkTokenAndLoadCatalogs]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(totalCatalogs / catalogsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1)

  const handleAddCatalog = async (name: string, vertical: string, locales: string[], isPrimary: boolean) => {
    if (!token) {
      console.error('No token available, redirected to login page');
      window.location.href = '/login';
      return;
    }

    const isValidName = /^[A-Za-z]+$/.test(name);
    if (!isValidName) {
      setErrorMessage('Catalog name must contain only letters and cannot be empty.');
      return;
    }

    try {
      await addCatalog(name, vertical, locales, isPrimary, token);
      setErrorMessage(null);
      loadCatalogs();
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.error);
      } else {
        setErrorMessage('Failed to add catalog. Please try again.');
      }
    }
  };

  const handleUpdateCatalog = async (id: string, vertical: string, isPrimary: boolean, locales: string[]) => {
    if (!token) {
      console.error('No token available, redirected to login page');
      window.location.href = '/login';
      return;
    }

    await updateCatalog(id, vertical, isPrimary, locales, token);
    loadCatalogs();
    setEditingCatalog(null);
  };

  const handleEditCatalog = (catalog: Catalog) => {
    setEditingCatalog(catalog);
  };

  const handleDeleteCatalog = async (id: string) => {
    if (!token) {
      console.error('No token available, redirected to login page');
      window.location.href = '/login';
      return;
    }
    await deleteCatalog(id, token);
    loadCatalogs();
  };

  const handleBulkDeleteCatalogs = async () => {
    if (!token) {
      console.error('No token available, redirected to login page');
      window.location.href = '/login';
      return;
    }

    await deleteCatalogs(selectedCatalogs, token);
    setSelectedCatalogs([]);
    loadCatalogs();
  };

  return (
    <PageWrapper>
      <Title>Catalog Management</Title>

      {selectedCatalogs.length > 0 && (
        <BulkDeleteButton onClick={handleBulkDeleteCatalogs}>
          Delete Selected
        </BulkDeleteButton>
      )}

      <Section>
        {errorMessage && <Error>{errorMessage}</Error>}
        <CatalogForm
          onAdd={handleAddCatalog}
          onUpdate={handleUpdateCatalog}
          editingCatalog={editingCatalog}
          onCancel={() => setEditingCatalog(null)}
        />
      </Section>

      <Section>
        <CatalogList
          catalogs={catalogs}
          onUpdate={handleEditCatalog}
          onSelect={setSelectedCatalogs}
          onDelete={handleDeleteCatalog}
        />
      </Section>

      <Pagination>
        {pageNumbers.map((pageNum) => (
          <PageButton
            key={pageNum}
            active={pageNum === currentPage}
            onClick={() => handlePageChange(pageNum)}
          >
            {pageNum}
          </PageButton>
        ))}
      </Pagination>
    </PageWrapper>
  );
};

export default CatalogPage;

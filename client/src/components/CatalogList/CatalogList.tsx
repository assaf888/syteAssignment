import React from 'react';
import {
  Table,
  TableHeader,
  TableRow,
  TableCell,
  NameCell,
  LocalesCell,
  PrimaryHeader,
  PrimaryCell,
  TableBody,
  CheckboxContainer,
  UpdateButton,
  DeleteButton,
  ButtonContainer,
} from './CatalogListStyles';

interface Catalog {
  _id: string;
  name: string;
  vertical: string;
  isPrimary: boolean;
  locales: string[];
  indexedAt: string;
}

interface CatalogListProps {
  catalogs: Catalog[];
  onUpdate: (catalog: Catalog) => void;
  onSelect: React.Dispatch<React.SetStateAction<string[]>>;
  onDelete: (id: string) => void;
}

const CatalogList: React.FC<CatalogListProps> = ({ catalogs, onUpdate, onSelect, onDelete }) => (
  <Table>
    <thead>
      <TableRow>
        <TableHeader>Select</TableHeader>
        <TableHeader>Name</TableHeader>
        <TableHeader>Vertical</TableHeader>
        <PrimaryHeader>Primary</PrimaryHeader>
        <TableHeader>Locales</TableHeader>
        <TableHeader>Locale Status</TableHeader>
        <TableHeader>Indexed At</TableHeader>
        <TableHeader>Actions</TableHeader>
      </TableRow>
    </thead>
    <TableBody>
      {catalogs.map((catalog) => (
        <TableRow key={catalog._id}>
          <TableCell>
            <CheckboxContainer>
              <input
                type="checkbox"
                onChange={(e) => {
                  onSelect((prev) =>
                    e.target.checked
                      ? [...prev, catalog._id]
                      : prev.filter((id) => id !== catalog._id)
                  );
                }}
              />
            </CheckboxContainer>
          </TableCell>
          <NameCell>{catalog.name}</NameCell>
          <TableCell>{catalog.vertical}</TableCell>
          <PrimaryCell>{catalog.isPrimary ? 'Yes' : 'No'}</PrimaryCell>
          <LocalesCell >{catalog.locales.join(', ')}</LocalesCell>
          <TableCell>{catalog.locales.length > 1 ? 'Multi-Locale' : 'Single-Locale'}</TableCell>
          <TableCell>{new Date(catalog.indexedAt).toLocaleString()}</TableCell>
          <TableCell>
            <ButtonContainer>
              <UpdateButton onClick={() => onUpdate(catalog)}>Update</UpdateButton>
              <DeleteButton onClick={() => onDelete(catalog._id)}>Delete</DeleteButton>
            </ButtonContainer>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

export default CatalogList;

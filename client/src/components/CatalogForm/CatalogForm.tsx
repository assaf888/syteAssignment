import React, { useState, useEffect, useRef } from 'react';
import { Form, Input, Select, CheckboxLabel, SubmitButton, CancelButton } from './CatalogFormStyles';

interface CatalogFormProps {
  onAdd: (name: string, vertical: string, locales: string[], isPrimary: boolean) => void;
  onUpdate: (id: string, vertical: string, isPrimary: boolean, locales: string[]) => void;
  editingCatalog?: any;
  onCancel: () => void;
}

const CatalogForm: React.FC<CatalogFormProps> = ({ onAdd, onUpdate, editingCatalog, onCancel }) => {
  const [name, setName] = useState('');
  const [vertical, setVertical] = useState('');
  const [locales, setLocales] = useState('');
  const [isPrimary, setIsPrimary] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (editingCatalog) {
      setName(editingCatalog.name);
      setVertical(editingCatalog.vertical);
      setLocales(editingCatalog.locales.join(', '));
      setIsPrimary(editingCatalog.isPrimary);

      formRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [editingCatalog]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCatalog) {
      onUpdate(editingCatalog._id, vertical, isPrimary, locales.split(',').map(loc => loc.trim()));
    } else {
      onAdd(name, vertical, locales.split(',').map(loc => loc.trim()), isPrimary);
    }
    setName('');
    setVertical('');
    setLocales('');
    setIsPrimary(false);
    onCancel();
  };

  return (
    <Form ref={formRef} onSubmit={handleSubmit}>
      <Input 
        type="text" 
        placeholder="Name" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        required 
        disabled={!!editingCatalog} 
      />
      <Select 
        value={vertical} 
        onChange={(e) => setVertical(e.target.value)} 
        required 
        disabled={!!editingCatalog}
      >
        <option value="">Select Vertical</option>
        <option value="fashion">Fashion</option>
        <option value="home">Home</option>
        <option value="general">General</option>
      </Select>
      <Input 
        type="text" 
        placeholder="Locales (comma-separated)" 
        value={locales} 
        onChange={(e) => setLocales(e.target.value)} 
      />
      <CheckboxLabel>
        <input 
          type="checkbox" 
          checked={isPrimary} 
          onChange={(e) => setIsPrimary(e.target.checked)} 
        />
        Primary
      </CheckboxLabel>
      <SubmitButton type="submit">
        {editingCatalog ? 'Update Catalog' : 'Add Catalog'}
      </SubmitButton>
      {editingCatalog && (
        <CancelButton type="button" onClick={onCancel}>Cancel</CancelButton>
      )}
    </Form>
  );
};

export default CatalogForm;

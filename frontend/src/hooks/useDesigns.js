import { useState, useEffect } from 'react';
import { designsApi } from '../services/api';
import { useToast } from './use-toast';

export const useDesigns = (filters = {}) => {
  const [designs, setDesigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { toast } = useToast();

  const fetchDesigns = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await designsApi.getAll(filters);
      setDesigns(data);
    } catch (err) {
      setError(err.message || 'Erro ao carregar designs');
      toast({
        title: "Erro",
        description: "Não foi possível carregar os designs",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDesigns();
  }, [JSON.stringify(filters)]);

  const refetch = () => {
    fetchDesigns();
  };

  const createDesign = async (designData) => {
    try {
      const newDesign = await designsApi.create(designData);
      setDesigns(prev => [newDesign, ...prev]);
      toast({
        title: "Sucesso",
        description: "Design criado com sucesso",
      });
      return newDesign;
    } catch (err) {
      toast({
        title: "Erro",
        description: "Não foi possível criar o design",
        variant: "destructive",
      });
      throw err;
    }
  };

  const updateDesign = async (designId, designData) => {
    try {
      const updatedDesign = await designsApi.update(designId, designData);
      setDesigns(prev => prev.map(d => d.id === designId ? updatedDesign : d));
      toast({
        title: "Sucesso",
        description: "Design atualizado com sucesso",
      });
      return updatedDesign;
    } catch (err) {
      toast({
        title: "Erro",
        description: "Não foi possível atualizar o design",
        variant: "destructive",
      });
      throw err;
    }
  };

  const deleteDesign = async (designId) => {
    try {
      await designsApi.delete(designId);
      setDesigns(prev => prev.filter(d => d.id !== designId));
      toast({
        title: "Sucesso",
        description: "Design excluído com sucesso",
      });
    } catch (err) {
      toast({
        title: "Erro",
        description: "Não foi possível excluir o design",
        variant: "destructive",
      });
      throw err;
    }
  };

  const duplicateDesign = async (designId) => {
    try {
      const duplicatedDesign = await designsApi.duplicate(designId);
      setDesigns(prev => [duplicatedDesign, ...prev]);
      toast({
        title: "Sucesso",
        description: "Design duplicado com sucesso",
      });
      return duplicatedDesign;
    } catch (err) {
      toast({
        title: "Erro",
        description: "Não foi possível duplicar o design",
        variant: "destructive",
      });
      throw err;
    }
  };

  const toggleFavorite = async (designId) => {
    try {
      const result = await designsApi.toggleFavorite(designId);
      setDesigns(prev => prev.map(d => 
        d.id === designId ? { ...d, isFavorite: result.isFavorite } : d
      ));
      toast({
        title: "Sucesso",
        description: result.isFavorite ? "Adicionado aos favoritos" : "Removido dos favoritos",
      });
      return result;
    } catch (err) {
      toast({
        title: "Erro",
        description: "Não foi possível alterar favorito",
        variant: "destructive",
      });
      throw err;
    }
  };

  return {
    designs,
    loading,
    error,
    refetch,
    createDesign,
    updateDesign,
    deleteDesign,
    duplicateDesign,
    toggleFavorite
  };
};

export const useDesign = (designId) => {
  const [design, setDesign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchDesign = async () => {
      if (!designId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const data = await designsApi.getById(designId);
        setDesign(data);
      } catch (err) {
        setError(err.message || 'Erro ao carregar design');
        toast({
          title: "Erro",
          description: "Não foi possível carregar o design",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchDesign();
  }, [designId]);

  const updateDesign = async (designData) => {
    try {
      const updatedDesign = await designsApi.update(designId, designData);
      setDesign(updatedDesign);
      return updatedDesign;
    } catch (err) {
      toast({
        title: "Erro",
        description: "Não foi possível atualizar o design",
        variant: "destructive",
      });
      throw err;
    }
  };

  return {
    design,
    loading,
    error,
    updateDesign
  };
};
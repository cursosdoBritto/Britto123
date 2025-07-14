import { useState, useEffect } from 'react';
import { templatesApi } from '../services/api';
import { useToast } from './use-toast';

export const useTemplates = (filters = {}) => {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { toast } = useToast();

  const fetchTemplates = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await templatesApi.getAll(filters);
      setTemplates(data);
    } catch (err) {
      setError(err.message || 'Erro ao carregar templates');
      toast({
        title: "Erro",
        description: "Não foi possível carregar os templates",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTemplates();
  }, [JSON.stringify(filters)]);

  const refetch = () => {
    fetchTemplates();
  };

  return {
    templates,
    loading,
    error,
    refetch
  };
};

export const useTemplate = (templateId) => {
  const [template, setTemplate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchTemplate = async () => {
      if (!templateId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const data = await templatesApi.getById(templateId);
        setTemplate(data);
      } catch (err) {
        setError(err.message || 'Erro ao carregar template');
        toast({
          title: "Erro",
          description: "Não foi possível carregar o template",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchTemplate();
  }, [templateId]);

  return {
    template,
    loading,
    error
  };
};

export const useTemplateCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await templatesApi.getCategories();
        setCategories(data.categories || []);
      } catch (err) {
        setError(err.message || 'Erro ao carregar categorias');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return {
    categories,
    loading,
    error
  };
};
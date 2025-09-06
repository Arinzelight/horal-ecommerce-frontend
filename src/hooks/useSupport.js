import { useCallback, useState } from "react";
import api from "../utils/api";

const useSupport = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [staffs, setStaffs] = useState([]);

  // Helper function to handle errors
  const handleError = (error) => {
    setError(
      error.response?.data?.message || error.message || "An error occurred"
    );
    setLoading(false);
    throw error;
  };

  // Build query string from filters
  const buildQueryString = useCallback((filters = {}) => {
    const params = new URLSearchParams();

    // Only add non-empty and non-"all" filter values
    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== "all" && value.trim() !== "") {
        params.append(key, value);
      }
    });

    const queryString = params.toString();
    return queryString ? `?${queryString}` : "";
  }, []);

  // Generic fetch function that accepts filters
  const fetchTickets = useCallback(
    async (filters = {}) => {
      setLoading(true);
      setError(null);

      try {
        const queryString = buildQueryString(filters);
        const response = await api.get(
          `/dashboard/admin/support/tickets/${queryString}`
        );

        // With axios, response.data contains the actual data
        const data = response.data.results || response.data || [];
        setTickets(data);
        return data;
      } catch (err) {
        setError(
          err.response?.data?.message || err.message || "An error occurred"
        );
        return [];
      } finally {
        setLoading(false);
      }
    },
    [buildQueryString]
  );

  // Specific filter methods for convenience
  const filterByStatus = useCallback(
    (status) => {
      return fetchTickets({ status });
    },
    [fetchTickets]
  );

  const filterByType = useCallback(
    (type) => {
      return fetchTickets({ type });
    },
    [fetchTickets]
  );

  const filterByState = useCallback(
    (state) => {
      return fetchTickets({ state });
    },
    [fetchTickets]
  );

  const filterByDate = useCallback(
    (date) => {
      return fetchTickets({ date });
    },
    [fetchTickets]
  );

  // Apply multiple filters at once
  const applyFilters = useCallback(
    (filters) => {
      return fetchTickets(filters);
    },
    [fetchTickets]
  );

  // Clear all filters (fetch all tickets)
  const clearFilters = useCallback(() => {
    return fetchTickets({});
  }, [fetchTickets]);

  // Create ticket
  const createTicket = async (ticketData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post("/dashboard/admin/support/", ticketData);
      const newTicket = response.data.data || response.data || null;

      // Add the new ticket to the existing tickets list
      if (newTicket) {
        setTickets((prevTickets) => [...prevTickets, newTicket]);
      }

      setLoading(false);
      return newTicket;
    } catch (error) {
      handleError(error, "Error creating ticket:");
    }
  };

  // Fetch ticket details
  const fetchTicketDetails = async (ticketId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get(
        `/dashboard/admin/support/ticket/${ticketId}/`
      );
      const ticketDetails = response.data.data || response.data || {};
      setLoading(false);
      return ticketDetails;
    } catch (error) {
      handleError(error, "Error fetching ticket details information:");
    }
  };

  // Update ticket status
  const updateTicketStatus = async ({ ticketId, statusData }) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.patch(
        `/dashboard/admin/support/tickets/${ticketId}/update/`,
        statusData
      );
      const updatedTicket = response.data.data || response.data || null;

      // Update the ticket in the tickets list
      if (updatedTicket) {
        setTickets((prevTickets) =>
          prevTickets.map((ticket) =>
            ticket.id === ticketId ? { ...ticket, ...updatedTicket } : ticket
          )
        );
      }

      setLoading(false);
      return updatedTicket;
    } catch (error) {
      handleError(error, "Error updating ticket status:");
    }
  };

  //fetch staffs
  const fetchStaffs = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get("/dashboard/admin/support/staff/");
      const staffs = response.data.data || response.data || [];
      setStaffs(staffs);
      setLoading(false);
      return staffs;
    } catch (error) {
      handleError(error, "Error fetching staff information:");
    }
  };

  const addTeamMember = async (memberData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post(
        "/dashboard/admin/support/team/add/",
        memberData
      );
      const newMember = response.data.data || response.data || null;

      // Add the new member to the existing staff list
      if (newMember) {
        setStaffs((prevStaffs) => [...prevStaffs, newMember]);
      }

      setLoading(false);
      return newMember;
    } catch (error) {
      handleError(error, "Error adding team member:");
    }
  };

  //assign ticket
  const assignTicket = async (ticketId, assigned_to_id) => {
    setLoading(true);
    setError(null);

    const requestBody = { assigned_to_id: assigned_to_id };
    const apiUrl = `/dashboard/admin/support/tickets/${ticketId}/update/`;

    try {
      const response = await api.patch(apiUrl, requestBody);

      const updatedTicket = response.data.data || response.data || null;

      // Update the ticket in the tickets list
      if (updatedTicket) {
        setTickets((prevTickets) => {
          const updatedTickets = prevTickets.map((ticket) =>
            ticket.id === ticketId ? { ...ticket, ...updatedTicket } : ticket
          );
          return updatedTickets;
        });
      } else {
        console.warn("No updated ticket data received");
      }

      setLoading(false);
      return updatedTicket;
    } catch (error) {
      handleError(error, "Error assigning ticket:");
    }
  };

  const getTeamMembers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get("/dashboard/admin/support/team/");
      const teamMembers = response.data.data || response.data || [];
      setLoading(false);
      return teamMembers;
    } catch (error) {
      handleError(error, "Error fetching team members:");
    }
  };

  //respond to ticket
  const respondToTicket = async (responseId, messageData, ticketType = null) => {
    let url = `/dashboard/admin/support/${responseId}/messages/`;
    
    // Add type parameter only for return tickets
    if (ticketType === "returns") {
      url += "?type=returns";
    }
    setLoading(true);
    setError(null);
    try {
      const response = await api.post(
        url,
        messageData
      );
      const reply = response.data.data || response.data || null;
      setLoading(false);
      return reply;
    } catch (error) {
      handleError(error, "Error responding to ticket:");
    }
  };

  //fetche messages in a ticket if url param is passed, then that is for return tickets

  const fetchTicketMessages = async (ticketId, ticketType = null) => {
    let url = `/dashboard/admin/support/${ticketId}/messages/`;

    // Add type parameter only for return tickets
    if (ticketType === "returns") {
      url += "?type=returns";
    }

    setLoading(true);
    setError(null);
    try {
      const response = await api.get(url);
      const messages = response.data.data || response.data || [];
      setLoading(false);
      return messages;
    } catch (error) {
      handleError(error, "Error fetching ticket messages:");
    }
  };

  // Update ticket status
  const updateSupportTicketStatus = async ({ ticketId, statusData }) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.patch(
        `/dashboard/admin/support/${ticketId}/update/`,
        statusData
      );
      const updatedTicket = response.data.data || response.data || null;

      // Update the ticket in the tickets list
      if (updatedTicket) {
        setTickets((prevTickets) =>
          prevTickets.map((ticket) =>
            ticket.id === ticketId ? { ...ticket, ...updatedTicket } : ticket
          )
        );
      }

      setLoading(false);
      return updatedTicket;
    } catch (error) {
      handleError(error, "Error updating ticket status:");
    }
  };

  const markReturnTicketAsRejected = async (returnId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.patch(
        `/order/return-approval/`,
        { return_id: returnId }
      );
      const updatedTicket = response.data.data || response.data || null;

      // Update the ticket in the tickets list
      if (updatedTicket) {
        setTickets((prevTickets) =>
          prevTickets.map((ticket) =>
            ticket.id === updatedTicket.id ? { ...ticket, ...updatedTicket } : ticket
          )
        );
      }

      setLoading(false);
      return updatedTicket;
    } catch (error) {
      handleError(error, "Error marking return ticket as rejected:");
    }
  };

  const markReturnTicketAsApproved = async (returnId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.patch(
        `/order/return-approval/`,
        { return_id: returnId }
      );
      const updatedTicket = response.data.data || response.data || null;

      // Update the ticket in the tickets list
      if (updatedTicket) {
        setTickets((prevTickets) =>
          prevTickets.map((ticket) =>
            ticket.id === updatedTicket.id ? { ...ticket, ...updatedTicket } : ticket
          )
        );
      }

      setLoading(false);
      return updatedTicket;
    } catch (error) {
      handleError(error, "Error marking return ticket as approved:");
    }
  };

  const cancelOrder = async (orderItemId, reason, attachments = []) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post(
        "/order/cancel/",
        {
          order_item_id: orderItemId,
          reason: reason,
          attachments: attachments,
        }
      );
      setLoading(false);
      return response.data;
    } catch (error) {
      handleError(error, "Error creating return ticket:");
      throw error;
    }
  };

  // Clear error function
  const clearError = () => setError(null);

  return {
    // State
    tickets,
    loading,
    error,
    staffs,

    // Functions
    fetchTickets,
    createTicket,
    fetchTicketDetails,
    updateTicketStatus,
    filterByStatus,
    filterByType,
    filterByState,
    filterByDate,
    clearFilters,
    applyFilters,
    fetchStaffs,
    addTeamMember,
    assignTicket,
    getTeamMembers,
    respondToTicket,
    fetchTicketMessages,
    updateSupportTicketStatus,
    clearError,
    markReturnTicketAsRejected,
    markReturnTicketAsApproved,
    cancelOrder
  };
};

export default useSupport;

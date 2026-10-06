import logging
from .supply_chain import SupplyChainAdapter
from .hrmsm import HRMSMAdapter
from .generic import GenericProductAdapter

logger = logging.getLogger(__name__)


class ProductAdapterRegistry:
    """
    Central registry for all 12 SaaS product provisioning adapters.
    Allows dynamic lookup and registration as new product APIs are added.
    """
    _adapters = {}

    @classmethod
    def register(cls, aliases, adapter_class):
        if isinstance(aliases, str):
            aliases = [aliases]
        adapter_instance = adapter_class() if isinstance(adapter_class, type) else adapter_class
        for alias in aliases:
            cls._adapters[alias.lower().strip()] = adapter_instance
        logger.info(f"Registered product adapter for aliases: {aliases}")

    @classmethod
    def get_adapter(cls, product_identifier):
        """
        Looks up the appropriate adapter by product code, name, or slug.
        Falls back to GenericProductAdapter if no specialized adapter is registered.
        """
        if not product_identifier:
            return GenericProductAdapter()

        key = str(product_identifier).lower().strip().replace("_", "-")
        if key in cls._adapters:
            return cls._adapters[key]

        # Try matching without dashes
        key_nodash = key.replace("-", "")
        if key_nodash in cls._adapters:
            return cls._adapters[key_nodash]

        # Fallback to generic adapter for the 10 other products
        return GenericProductAdapter(
            product_code=key,
            product_name=str(product_identifier),
            default_api_url=f"https://{key_nodash}.itsoftlab360.com/api/users",
        )

    @classmethod
    def list_registered_adapters(cls):
        return sorted(list(cls._adapters.keys()))


# Register initial specialized adapters
ProductAdapterRegistry.register(["supply-chain", "supplychain", "Supply Chain", "sc"], SupplyChainAdapter)
ProductAdapterRegistry.register(["hrms", "hrmsm", "HRMSM", "HRMS"], HRMSMAdapter)

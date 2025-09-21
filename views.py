from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
from .contract import contract, w3

def home(request):
    return HttpResponse("Hello from SureFi app!")


def get_contract_owner(request):
    try:
        owner = contract.functions.owner().call()
        return JsonResponse({"owner": owner})
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)

def check_verified(request):
    # Example: pass address as GET param ?address=0x123...
    addr = request.GET.get("address")
    if not addr:
        return JsonResponse({"error": "Address parameter is required"}, status=400)

    try:
        checksum_addr = w3.to_checksum_address(addr)
        verified = contract.functions.verified(checksum_addr).call()
        return JsonResponse({"address": checksum_addr, "verified": verified})
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)

